import { ApolloServer } from "npm:@apollo/server@^4.1";
import { buildSubgraphSchema } from "npm:@apollo/subgraph@^2.9.2";
import { startStandaloneServer } from "npm:@apollo/server@4.1/standalone";
import { parse } from "npm:graphql@16.6";
import { resolvers } from "./resolvers.ts";

const decoder = new TextDecoder("utf-8");
const fileData = Deno.readFileSync("schema.graphql");
const typeDefs = parse(decoder.decode(fileData));

const server = new ApolloServer({
  schema: buildSubgraphSchema({
    typeDefs,
    resolvers,
  }),
  introspection: true,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4001 },
});

console.log(`Server running on: ${url}`);
