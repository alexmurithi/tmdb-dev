import { ApolloClient, InMemoryCache, HttpLink, from} from "@apollo/client";
import { onError } from "@apollo/client/link/error";

const httpLink = new HttpLink({
    uri: "http://localhost:4000/graphql"
  });

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.forEach(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        ),
      );
  
    if (networkError) console.log(`[Network error]: ${networkError}`);
  });

const Client = new ApolloClient({
    link: from( [errorLink,httpLink]),
    cache: new InMemoryCache()
})


export default Client;
