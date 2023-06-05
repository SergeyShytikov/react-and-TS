import { PostData } from './types';

export function assertIsPosts(postsData: unknown): asserts postsData is PostData[] {
  if (!Array.isArray(postsData)) {
    throw new Error("posts isn't in array");
  }
  if (postsData.length === 0) {
    return;
  }
  postsData.forEach((post) => {
    if (!('id' in post)) {
      throw new Error("post doesn't contain id");
    }
    if (typeof post.id !== 'number') {
      throw new Error('id is not a number');
    }
    if (!('title' in post)) {
      throw new Error("post doesn't contain title");
    }
    if (typeof post.title !== 'string') {
      throw new Error('title is not a string');
    }
    if (!('description' in post)) {
      throw new Error("post doesn't contain description");
    }
    if (typeof post.description !== 'string') {
      throw new Error('description is not a string');
    }
  });
}

export async function getPosts() {
  const response = await fetch(import.meta.env.VITE_API_URL!);
  const body = (await response.json()) as unknown;
  console.log(body);
  assertIsPosts(body);

  return body;
}
