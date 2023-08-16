import * as dotenv from "dotenv";

/**
 * Deno works only with relative paths. As a result,
 * we have to specify where the relative path of the ".env"
 * is everytime we want to use it.
 *
 * This function is based on code from:
 * https://dev.to/eriesgo/dotenv-and-relative-paths-fp2
 */
export default async function loadEnv(relativePath: string) {
  return await dotenv.load({envPath: relativePath});
}