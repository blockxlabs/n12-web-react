import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

import store from '../../reducers';
import { Provider } from 'react-redux'; 

import { ApolloProvider } from '@apollo/client';
import client from '../../graphql'

test('renders N10n Text', () => {
  const { getByText } = render(
    <Provider store={store}> 
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </Provider>);
  const linkElement = getByText(/N12/i);
  expect(linkElement).toBeInTheDocument();
});
