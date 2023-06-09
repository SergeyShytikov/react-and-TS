import { useEffect, useState, Suspense } from 'react';
import { PostData, NewPostData } from './types';
import { PostsList } from './PostsList';
import { savePost } from './savePost';
import { NewPostForm } from './NewPostForm';
import { useLoaderData, Await, defer, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient, QueryClient } from '@tanstack/react-query';
import { assertIsPosts, getPosts } from './getPosts';

type Data = {
  posts: PostData[];
};
export function assertIsData(data: unknown): asserts data is Data {
  if (typeof data !== 'object') {
    throw new Error("Data isn't an object");
  }
  if (data === null) {
    throw new Error('Data is null');
  }
  if (!('posts' in data)) {
    throw new Error("data doesn't contain posts");
  }
}

const queryClient = new QueryClient();

export default function PostsPage() {
  const navigate = useNavigate();
  // const { isLoading, isFetching, data: posts } = useQuery(['postsData'], getPosts);
  const queryClient = useQueryClient();
  const { mutate } = useMutation(savePost, {
    onSuccess: (savedPost) => {
      queryClient.setQueryData<PostData[]>(['postsData'], (oldPosts) => {
        if (oldPosts === undefined) {
          return [savedPost];
        } else {
          return [savedPost, ...oldPosts];
        }
      });
      navigate('/blog');
    },
  });

  // if (isLoading || posts === undefined) {
  //   return <div className="w-96 mx-auto mt-6">Loading...</div>;
  // }

  const data = useLoaderData();
  assertIsData(data);

  // const [isLoading, setIsLoading] = useState(true);
  // const [posts, setPosts] = useState<PostData[]>([]);
  // useEffect(() => {
  //   let cancel = false;
  //   getPosts().then((data) => {
  //     if (!cancel) {
  //       setPosts(data);
  //       setIsLoading(false);
  //     }
  //   });
  //   return () => {
  //     cancel = true;
  //   };
  // }, []);

  // async function handleSave(NewPostData: NewPostData) {
  //   await savePost(NewPostData);
  // }

  return (
    <div className="w-96 mx-auto mt-6">
      <h2
        className="text-xl text-slate-900 font-
bold"
      >
        Posts
      </h2>
      <NewPostForm onSave={mutate} />
      {/* {isFetching ? <div>Fetching...</div> : <PostsList posts={posts} />} */}
      <Suspense fallback={<div>Fetching...</div>}>
        <Await resolve={data.posts}>
          {(posts) => {
            assertIsPosts(posts);
            return <PostsList posts={posts} />;
          }}
        </Await>
      </Suspense>
    </div>
  );
}
