// ApolloClient.js
import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:3000/api/graphql', // Adjust this to your server's URL
  cache: new InMemoryCache(),
});

export default client;