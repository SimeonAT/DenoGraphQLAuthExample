# Authentication Implementation for Deno Oak GraphQL Servers

This repository contains my attempt at implementing basic authentication and authorization for a backend server powered by both [Deno](https://deno.land/), [Oak](https://oakserver.github.io/oak/), and [GraphQL](https://graphql.org/).

## Instructions

After cloning this repository locally, create a `.env` in the *root* directory of this project. The `.env` file should contain the following contents:

```
PORT=[The port that the server should run on]
DATABASE=[The name of the Postgres database to connect to]
DB_USERNAME=[The username to login into the Postgres database]
DB_PASSWORD=[The password for the Postgres database]
DB_PORT=[The port of the Postgres database]
DB_HOST=[The IP address or hostname of the Postgres database]
SECRET_ALG="RS256"
JWT_ISSUER=[The hostname of the backend. By default it should be "localhost".]
JWT_AUDIENCE=[The hostname of the backend. By default it should be "localhost".]
```

The backend codebase does not provide a [PostgreSQL](https://www.postgresql.org/) instance that you can connect to. You must host your own Postgres instance, and enter the details of your PostgreSQL database in the `.env` file before running the backend server. I particuarly recommend using [Docker](https://hub.docker.com/_/postgres) to host your PostgreSQL database.

Furthermore, the `JWT_ISSUER` and `JWT_AUDIENCE` fields should be the same, as the JWTs created by this backend server will also only be consumed by this same backend server. If you are running the backend server locally, I recommend you set both fields to `localhost`.