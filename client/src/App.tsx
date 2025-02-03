import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
  useQuery,
} from "@apollo/client";
import "./App.css";

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "network-only",
    },
    query: {
      fetchPolicy: "network-only",
    },
  },
});

const GET_LOCATIONS = gql`
  query GetLocations {
    allLocations {
      id
      name
      coordinate {
        lat
        lon
      }
    }
  }
`;

function LocationsList() {
  const { loading, error, data, refetch } = useQuery(GET_LOCATIONS, {
    fetchPolicy: "network-only",
  });

  return (
    <div>
      <button onClick={() => refetch()}>Fetch Locations</button>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && (
        <div>
          <h2>Locations:</h2>
          <pre>{JSON.stringify(data.allLocations, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        <h1>Federation Practice</h1>
        <p>GraphQL Federation Demo</p>
        <LocationsList />
      </div>
    </ApolloProvider>
  );
}

export default App;
