import loadEnv from "./system/env.ts";
import {createApp} from './app.ts';
import DatabaseService from "./system/db/service.ts";

const env = await loadEnv("./.env");
const port = +(env.PORT);

/**
 * Starts the HTTP server.
 *
 * The code comes from the example shown in the Github
 * repo for the GQL Deno library:
 * https://github.com/deno-libs/gql/blob/master/examples/oak.ts#L56
 */
export async function startServer() {
  await new DatabaseService().initDb();
  await createApp().listen({port: port});
  return;
}

await startServer();