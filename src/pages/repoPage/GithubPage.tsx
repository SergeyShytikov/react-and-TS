import { GET_VIEWER_QUERY } from '../../api/getViewer';
import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { GET_REPO } from '../../api/getRepo';
import { STAR_REPO } from '../../api/starRepo';
import { RepoData, SearchCriteria } from '../../api/types';
import { SearchRepoForm } from './SearchRepoForm';
import { FoundRepo } from './FoundRepo';
import { StarRepoButton } from './StarRepoButton';
import { useLazyQuery, useApolloClient } from '@apollo/client';
import { useMutation as useApolloMutation } from '@apollo/client';
export default function GithubPage() {
  const [searchCriteria, setSearchCriteria] = useState<SearchCriteria | undefined>();
  const [getRepo, { data }] = useLazyQuery(GET_REPO);
  // const { data } = useQuery(
  //   ['repo', searchCriteria],
  //   () => getRepo(searchCriteria as SearchCriteria),
  //   {
  //     enabled: searchCriteria !== undefined,
  //   },
  // );
  const apolloQueryClient = useApolloClient();
  const queryClient = useQueryClient();
  const [starRepo] = useApolloMutation(STAR_REPO, {
    onCompleted: () => {
      apolloQueryClient.cache.writeQuery({
        query: GET_REPO,
        data: {
          repository: {
            ...data.repository,
            viewerHasStarred: true,
          },
        },
        variables: searchCriteria,
      });
    },
  });
  const { loading: isLoading, data: viewerData } = useQuery(GET_VIEWER_QUERY);
  if (isLoading || viewerData === undefined) {
    return <div>...</div>;
  }

  function handleSearch(search: SearchCriteria) {
    getRepo({
      variables: { ...search },
    });
    setSearchCriteria(search);
  }

  function handleStarClick() {
    if (data) {
      starRepo({ variables: { repoId: data.repository.id } });
    }
  }

  return (
    <main className="flex">
      <section
        className="flex flex-col items-center text-
      slate-50 bg-sky-100 p-5 max-h-fit"
      >
        <img src={viewerData.viewer.avatarUrl} alt="Viewer" className="rounded-full w-16 h-16" />
        <div>{viewerData.viewer.name}</div>
      </section>
      <div className="max-w-xs ml-auto mr-auto">
        <SearchRepoForm onSearch={handleSearch} />
        {data && (
          <>
            <FoundRepo
              name={data.repository.name}
              description={data.repository.description}
              stars={data.repository.stargazers.totalCount}
            />
            {!data.repository.viewerHasStarred && <StarRepoButton onClick={handleStarClick} />}
          </>
        )}
      </div>
    </main>
  );
}
