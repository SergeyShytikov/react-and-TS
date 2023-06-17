import { ApolloClient, InMemoryCache } from '@apollo/client';
export const apolloClient = new ApolloClient({
  uri: import.meta.env.VITE_GITHUB_URL!,
  cache: new InMemoryCache(),
  headers: {
    'Content-Type': 'application/json',
    authorization: `bearer ${import.meta.env.VITE_GITHUB_PAT}`,
  },
});
