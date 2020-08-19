import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { Provider } from 'react-redux';
import defaultStore from '../reducers';
import { MockedProvider } from '@apollo/client/testing';
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

function render(
  ui,
  {
    apolloClient = [],
    store = defaultStore,
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <MockedProvider mocks={apolloClient} addTypename={false}>
          <Router history={history}>
          {children}
          </Router>
        </MockedProvider>
      </Provider>
    );
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

// re-export everything
export * from '@testing-library/react';

// override render method
export { render };