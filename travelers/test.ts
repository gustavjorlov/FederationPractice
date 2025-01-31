import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";

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
