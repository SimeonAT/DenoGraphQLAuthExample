import * as postgres from 'postgres';
import loadEnv from '../env.ts';

/**
 * TODO:
 *  1. Create `.env` variable to hold boolean determining whether or not
 *     the database the client should use is the test database.
 *
 *     By default, the boolean is false, which defaults to the `dev` database.
 *
 * 2. In each of your test files, you will set to `.env` variable true
 *    so that the client uses the `test` database, rather than the `dev` database.
 *
 * 3. Add a ternary operator in `database:env.DATABASE` so that the `test` database
 *    is used if the boolean is set to true.
 */

const env = await loadEnv("./.env");

const client = new postgres.Client({
  user: env.DB_USERNAME,
  database: env.DATABASE,
  hostname: env.DB_HOST,
  password: env.DB_PASSWORD,
  port: env.DB_PORT,
});

await client.connect();

export default client;
