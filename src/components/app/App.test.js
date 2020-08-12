import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

import store from '../../reducers';
import { Provider } from 'react-redux'; 

import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline } from '@material-ui/core';

import { ApolloProvider } from '@apollo/client';

import client from '../../graphql';
import { theme } from './App.theme';


test('renders N10n Text', () => {
  const { getByText } = render(
    <Provider store={store}> 
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <CssBaseline/>
          <App />
        </ThemeProvider>
      </ApolloProvider>
    </Provider>);
  const linkElement = getByText(/N12/i);
  expect(linkElement).toBeInTheDocument();
});
