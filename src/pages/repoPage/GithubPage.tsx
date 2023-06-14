import { getViewer } from '../../api/getViewer';
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getRepo } from '../../api/getRepo';
import { starRepo } from '../../api/starRepo';
import { RepoData, SearchCriteria } from '../../api/types';
import { SearchRepoForm } from './SearchRepoForm';
import { FoundRepo } from './FoundRepo';
import { StarRepoButton } from './StarRepoButton';

export default function GithubPage() {
  const [searchCriteria, setSearchCriteria] = useState<SearchCriteria | undefined>();
  const { data } = useQuery(
    ['repo', searchCriteria],
    () => getRepo(searchCriteria as SearchCriteria),
    {
      enabled: searchCriteria !== undefined,
    },
  );
  const queryClient = useQueryClient();
  const { mutate } = useMutation(starRepo, {
    onSuccess: () => {
      queryClient.setQueryData<RepoData>(['repo', searchCriteria], (repo) => {
        if (repo === undefined) {
          return undefined;
        }
        return {
          ...repo,
          viewerHasStarred: true,
        };
      });
    },
  });
  const { isLoading, data: viewerData } = useQuery(['viewer'], getViewer);
  if (isLoading || viewerData === undefined) {
    return <div>...</div>;
  }

  function handleSearch(search: SearchCriteria) {
    setSearchCriteria(search);
  }

  function handleStarClick() {
    if (data) {
      mutate(data.repository.id);
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
