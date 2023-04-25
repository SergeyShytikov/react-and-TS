import { createBrowserRouter, RouterProvider, Outlet, useOutletContext } from 'react-router-dom';
import { ProductsPage } from './pages/ProductsPage';
import { ProductPage } from './pages/ProductPage';
import { Header } from './Header';
import { ErrorPage } from './pages/ErrorPage';
import { HomePage } from './pages/HomePage';
import { lazy, Suspense } from 'react';
import { AppReducer } from './AppReducer';

const AdminPageWrapper = lazy(() => import('./pages/AdminPageWrapper'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const ThankYouPage = lazy(() => import('./pages/ThankYouPage'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppReducer />,
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
            fallback={
              <div className="text-center p-5 text-xl text-slate-00">Loading admin panel...</div>
            }
          >
            <AdminPageWrapper />
          </Suspense>
        ),
      },
      {
        path: 'services',
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
  {
    path: '/',
    element: (
      <Header
        user={undefined}
        onSignInClick={function (): void {
          throw new Error('Function not implemented.');
        }}
        loading={false}
      />
    ),
  },
]);

export function Routes() {
  return <RouterProvider router={router} />;
}
