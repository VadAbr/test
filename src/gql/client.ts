import {
  InMemoryCache,
  ApolloClient,
  ApolloLink,
  HttpLink,
} from '@apollo/client';
import { getLocalItem } from '../utils';
import { tokenLocalKey } from '../constants';

const httpLink = new HttpLink({ uri: process.env.REACT_APP_BASE_URL });

const authLink = new ApolloLink((operation, forward) => {
  const token = getLocalItem(tokenLocalKey);

  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : '',
    },
  });

  return forward(operation);
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    addTypename: false,
  }),
});
