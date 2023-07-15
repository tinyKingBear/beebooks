import { requestBaseURL } from '@/const';
import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: `${requestBaseURL}/graphql`,
  cache: new InMemoryCache(),
});

export default client;