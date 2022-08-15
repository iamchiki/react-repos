import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { API_URL, AUTH_TOKEN } from "../utils/constants";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: API_URL,
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${AUTH_TOKEN}`,
    },
  };
});
export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
