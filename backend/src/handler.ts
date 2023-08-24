/**
 * The source code in defines the handler for the GraphQL server,
 * and comes from the example shown in the Github repo for
 * the GQL Deno library:
 * https://github.com/deno-libs/gql/blob/master/examples/oak.ts
 */
import {GraphQLHTTP} from "gql";
import {makeExecutableSchema} from "graphql_tools";
import * as oak from "oak";

import resolvers from "./graphql/resolver.ts";
import typeDefs from "./graphql/schema.ts";

/**
 * Retruns a function that is the GraphQL middleware for
 * the Oak HTTP server.
 *
 * The code comes from the example shown in the Github
 * repo for the GQL Deno library:
 * https://github.com/deno-libs/gql/blob/master/examples/oak.ts#L32
 */
function createMiddleware(
  resolver: (request: Request) => Promise<Response>
) {
  return async (context: oak.Context) => {
    const request = new Request(context.request.url.toString(), {
      body: context.request.originalRequest.getBody().body,
      headers: context.request.headers,
      method: context.request.method,
    });

    return await resolver(request)
      .then((response) => {
        for (const [key, value] of response.headers.entries()) {
          context.response.headers.append(key, value);
        }

        context.response.status = response.status;
        context.response.body = response.body;
        return;
      });
  };
} 

/**
 * The code comes from the example shown in the Github
 * repo for the GQL Deno library:
 * https://github.com/deno-libs/gql/blob/master/examples/oak.ts#L24
 */
export default function handler() {
  const schema = makeExecutableSchema({
    typeDefs: typeDefs,
    resolvers: resolvers,
  })

  const resolver = GraphQLHTTP<Request>({
    schema,
    graphiql: true,
    context: (request) => ({request}),
  });

  return createMiddleware(resolver);
}