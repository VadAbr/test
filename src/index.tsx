import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';

import App from './components/app';
import { client } from './gql';
import { AuthProvider } from './hooks';

import './global.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <AuthProvider>
        <HashRouter basename={'/'}>
          <App />
        </HashRouter>
      </AuthProvider>
    </ApolloProvider>
  </React.StrictMode>,
);
