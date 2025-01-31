import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";
import { ApolloServer } from "npm:@apollo/server@^4.1";
import { buildSubgraphSchema } from "npm:@apollo/subgraph@^2.9.2";
import { startStandaloneServer } from "npm:@apollo/server@4.1/standalone";
import { parse } from "npm:graphql@16.6";
import { addMocksToSchema } from "npm:@graphql-tools/mock";
import { makeExecutableSchema } from "npm:@graphql-tools/schema";
import { Traveler } from "./resolvers.ts";
import {
  spy,
  assertSpyCalls,
  assertSpyCall,
} from "https://deno.land/std@0.224.0/testing/mock.ts";

const decoder = new TextDecoder("utf-8");
const fileData = Deno.readFileSync("schema.graphql");
const typeDefs = parse(decoder.decode(fileData));

Deno.test("returns travelers names", async () => {
  const NAME = "Gustav";
  const spyableFunctions = {
    getTravelersFromDb: () => [{ id: 2, name: NAME }],
  };
  const travelersFromDBSpy = spy(spyableFunctions, "getTravelersFromDb");
  const mocks = {
    Query: () => ({
      allTravelers: spyableFunctions.getTravelersFromDb,
    }),
  };
  const testServer = new ApolloServer({
    schema: addMocksToSchema({
      schema: buildSubgraphSchema({
        typeDefs,
      }),
      mocks,
    }),
  });

  const response = await testServer.executeOperation({
    query:
      "query AllTravelers($overAge: Int!) { allTravelers(overAge: $overAge) { name } }",
    variables: { overAge: 30 },
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
  assertSpyCalls(travelersFromDBSpy, 1);
  assertSpyCall(travelersFromDBSpy, 0, {
    args: [{ overAge: 30 }],
    returned: [{ id: 2, name: NAME }],
  });
  testServer.stop();
});
// Deno.test("GraphQL Hello Query", async () => {
//   // Start the Apollo Server on a random port
//   // const { url } = await server.listen({ port: 0 });

//   const response = await fetch("http://0.0.0.0:4001/", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ query: "{ allTravelers(overAge: 30) { id } }" }),
//   });

//   const result = await response.json();

//   console.log(result);

//   assertEquals(result.data.allTravelers[0].id, "1");
// });
