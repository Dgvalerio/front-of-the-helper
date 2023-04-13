import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: `${process.env.NEXT_PUBLIC_API_URI}`,
});

const authLink = setContext((_, { headers }) => {
  try {
    const storage = localStorage.getItem('the-helper:user-storage');

    const {
      state: { token },
    } = JSON.parse(`${storage}`);

    return {
      headers: { ...headers, authorization: token ? `Bearer ${token}` : '' },
    };
  } catch (e) {
    return { headers: { ...headers, authorization: '' } };
  }
});

const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default apolloClient;
