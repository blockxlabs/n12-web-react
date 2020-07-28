import { ApolloClient, InMemoryCache } from '@apollo/client';
import { resolvers, typeDefs } from './resolvers';
import initialState from './initialState';
import fetch from 'unfetch'

const cache = new InMemoryCache()

const client = new ApolloClient({
  // fetch,
  uri: 'http://localhost:4000/graphql',
  cache
  // typeDefs,
  // resolvers,
});

// cache.writeData({
//   data: initialState,
// });


export default client