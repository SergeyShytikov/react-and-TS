import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  useOutletContext,
  defer,
} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { ApolloProvider } from '@apollo/client';
import { ProductsPage } from './pages/ProductsPage';
import { ProductPage } from './pages/ProductPage';
import { Header } from './Header';
import { ErrorPage } from './pages/ErrorPage';
import { HomePage } from './pages/HomePage';
import { lazy, Suspense } from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { getPosts } from './posts/getPosts';
import { GithubPage } from './pages/repoPage/GithubPage';
// import { apolloClient } from './client';
const AdminPage = lazy(() => import('./pages/AdminPage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const ThankYouPage = lazy(() => import('./pages/ThankYouPage'));
const PostsPage = lazy(() => import('./posts/PostsPage'));
// const GithubPage = lazy(() => import('./pages/repoPage/GithubPage'));

const reactQueryClient = new QueryClient();

export const postsLoader = async () => {
  const existingData = reactQueryClient.getQueryData(['postsData']);
  if (existingData) {
    return defer({ posts: existingData });
  }
  return defer({ posts: reactQueryClient.fetchQuery(['postsData'], getPosts) });
};
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Provider store={store}>
        <Header
          user={undefined}
          onSignInClick={function (): void {
            throw new Error('Function not implemented.');
          }}
          loading={false}
        />
        <Outlet />
      </Provider>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'products',
        element: <ProductsPage />,
      },
      {
        path: 'products/:id',
        element: <ProductPage />,
      },
      {
        path: '/admin',
        element: (
          <Suspense
            fallback={<div className="text-center p-5 text-xl text-slate-00">Loading ...</div>}
          >
            <AdminPage />
          </Suspense>
        ),
      },
      {
        path: '/blog',
        element: (
          <Suspense
            fallback={
              <div className="text-center p-5 text-xl text-slate-00">Loading posts ...</div>
            }
          >
            <PostsPage />
          </Suspense>
        ),
        loader: postsLoader,
      },
      {
        path: '/services',
        element: (
          <Suspense
            fallback={
              <div className="text-center p-5 text-xl text-slate-00">Loading services...</div>
            }
          >
            <ServicesPage />
          </Suspense>
        ),
      },
      {
        path: '/github',

        element: <GithubPage />,
        // (
        //   <Suspense
        //     fallback={
        //       <div className="text-center p-5 text-xl text-slate-00">Loading services...</div>
        //     }
        //   >
        //   </Suspense>
        // ),
      },
      {
        path: '/form',
        element: (
          <Suspense
            fallback={
              <div className="text-center p-5 text-xl text-slate-00">Loading contact form...</div>
            }
          >
            <ContactPage />
          </Suspense>
        ),
      },
      {
        path: '/thank-you/:name',
        element: (
          <Suspense
            fallback={
              <div className="text-center p-5 text-xl text-slate-00">Loading ThankYouPage ...</div>
            }
          >
            <ThankYouPage />,
          </Suspense>
        ),
      },
    ],
  },
]);

export function Routes() {
  return (
    <QueryClientProvider client={reactQueryClient}>
      {/* <ApolloProvider client={apolloClient}>
      </ApolloProvider> */}
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
