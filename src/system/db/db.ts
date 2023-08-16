import * as postgres from 'postgres';
import loadEnv from '../env.ts';

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
