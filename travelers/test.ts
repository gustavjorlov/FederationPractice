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
const typeDefs2 = parse(decoder.decode(fileData));

const resolvers = {
  Query: {
    allTravelers: () => travelers,
  },
};

Deno.test("returns hello with the provided name", async () => {
  const testServer = new ApolloServer({
    schema: buildSubgraphSchema({
      typeDefs: typeDefs2,
      resolvers,
    }),
  });

  const response = await testServer.executeOperation({
    query: "query AllTravelers { allTravelers { name } }",
    // variables: { name: "world" },
  });

  // console.log(JSON.stringify(response.body.singleResult.data, null, 2));

  // Note the use of Node's assert rather than Jest's expect; if using
  // TypeScript, `assert`` will appropriately narrow the type of `body`
  // and `expect` will not.
  assertEquals(response.body.kind, "single");
  if (response.body.kind === "single") {
    assertEquals(response.body.singleResult.errors, undefined);
    assertEquals(
      (response.body.singleResult.data?.allTravelers as Array<Traveler>)[0]
        .name,
      "Gustav"
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
