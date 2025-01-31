import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";
import { ApolloServer } from "npm:@apollo/server@^4.1";
import { buildSubgraphSchema } from "npm:@apollo/subgraph@^2.9.2";
import { startStandaloneServer } from "npm:@apollo/server@4.1/standalone";
import { parse } from "npm:graphql@16.6";
import { addMocksToSchema } from "npm:@graphql-tools/mock";
import { makeExecutableSchema } from "npm:@graphql-tools/schema";
import { Traveler, travelers } from "./resolvers.ts";

const decoder = new TextDecoder("utf-8");
const fileData = Deno.readFileSync("schema.graphql");
const typeDefs = parse(decoder.decode(fileData));

const resolvers = {
  Query: {
    allTravelers: () => travelers,
  },
};

Deno.test("returns travelers names", async () => {
  const NAME = "Gustav";
  const mocks = {
    Query: () => ({
      allTravelers: () => [{ id: 2, name: NAME }],
    }),
  };
  const testServer = new ApolloServer({
    schema: addMocksToSchema({
      schema: buildSubgraphSchema({
        typeDefs,
        resolvers,
      }),
      mocks,
    }),
  });

  const response = await testServer.executeOperation({
    query: "query AllTravelers { allTravelers { name } }",
    // variables: { name: "world" },
  });

  assertEquals(response.body.kind, "single");
  if (response.body.kind === "single") {
    assertEquals(response.body.singleResult.errors, undefined);
    assertEquals(
      (response.body.singleResult.data?.allTravelers as Array<Traveler>)[0]
        .name,
      NAME
    );
  }
  testServer.stop();
});
Deno.test("GraphQL Hello Query", async () => {
  // Start the Apollo Server on a random port
  // const { url } = await server.listen({ port: 0 });

  const response = await fetch("http://0.0.0.0:4001/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: "{ allTravelers { id } }" }),
  });

  const result = await response.json();

  assertEquals(result.data.allTravelers[0].id, "1");
});
