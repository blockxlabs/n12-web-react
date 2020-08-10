import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app/App';
import { theme } from './components/app/App.theme';

import { ThemeProvider } from '@material-ui/styles'; 
import { CssBaseline } from '@material-ui/core';

// uncomment to add Redux
import store from './reducers/';
import { Provider } from 'react-redux'; 

// uncomment for apollo client
import { ApolloProvider } from '@apollo/client';
import client from './graphql/'

import * as serviceWorker from './serviceWorker';


ReactDOM.render(
  <React.StrictMode>
    {/* // uncomment to add Redux   */}
    <Provider store={store}>
      {/* // uncomment for apollo client   */}
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <CssBaseline/>
          <App />
        </ThemeProvider>
      </ApolloProvider>
    {/* // uncomment to add Redux  */}
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
