import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-boost';
import { resolvers, typeDefs } from './resolvers';
import initialState from './initialState';
import fetch from 'unfetch'

const cache = new InMemoryCache()

const client = new ApolloClient({
  fetch,
  uri: 'http://localhost:4001/graphql',
  cache,
  typeDefs,
  resolvers,
});

cache.writeData({
  data: initialState,
});


export default client