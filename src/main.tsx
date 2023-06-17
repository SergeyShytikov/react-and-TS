import React from 'react';
import ReactDOM from 'react-dom/client';
import { Routes } from './Routes';
import './index.css';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from './client';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <Routes />
    </ApolloProvider>
  </React.StrictMode>,
);
