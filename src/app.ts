/**
 * The source code in this file sets up the GraphQL server,
 * and comes from the Deno blog:
 * https://deno.com/blog/build-a-graphql-server-with-deno
 */
import {oakCors} from "oakcors";
import * as oak from "oak";

import handler from './handler.ts';

/**
 * Sets up the "/graphql" route for the Oak HTTP server.
 *
 * The code comes from the example shown in the Github
 * repo for the GQL Deno library:
 * https://github.com/deno-libs/gql/blob/master/examples/oak.ts#L54
 */
export function createApp() {
  const router = new oak.Router().all('/graphql', handler());
  const app = new oak.Application();

  app.use(router.routes());
  app.use(router.allowedMethods());
  app.use(oakCors());
  return app;
}