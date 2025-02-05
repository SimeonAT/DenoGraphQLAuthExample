# Authentication Implementation for a Deno Oak GraphQL Backend Server

This repository contains my attempt at implementing basic authentication and authorization for a backend server powered by [Deno](https://deno.land/), [Oak](https://oakserver.github.io/oak/), and [GraphQL](https://graphql.org/).

For a deeper explanation about the codebase, feel free to take a look at my [blog post](https://simeonat.github.io/blog/deno-graphql/).

## Instructions

### Setting up the Environment

If you do not have Deno installed, you will need to [install it](https://deno.land/manual@v1.36.1/getting_started/installation) before running this codebase.

After cloning this repository locally, create a `.env` in the *root* directory of this project. The `.env` file should contain the following contents:

```
PORT=[The port that the server should run on]
DATABASE=[The name of the Postgres database to connect to]
DB_USERNAME=[Set the username of the Postgres database]
DB_PASSWORD=[Set the password for the Postgres database]
DB_PORT=[Set the port of the Postgres database]
DB_HOST=[The IP address or hostname of the Postgres database. By default it should be "localhost".]
SECRET_ALG="RS256"
JWT_ISSUER=[The hostname of the backend. By default it should be "localhost".]
JWT_AUDIENCE=[The hostname of the backend. By default it should be "localhost".]
```

Keep in mind that the `JWT_ISSUER` and `JWT_AUDIENCE` fields should be the same, as the JWTs created by this backend server will also only be consumed by this same backend server. If you are running the backend server locally, I recommend you set both fields to `localhost`.

### Running the Database

You will need [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed on your computer,
along with the [PostgreSQL Docker Image]([)](https://hub.docker.com/_/postgres).

To start the database, run the following command:
```bash
  deno task docker
```

To close the database, and to delete the volume that is used by it, run:
```bash
  deno task docker_clean
```

### Running the Backend Server

Once you have set up the `.env` file, you are now ready to run the backend server. 

1. Run the commands `deno task docker`, followed by `deno task dev`, in order to
   start the database and server, respectively.

2. Navigate to `localhost:${PORT}/graphql` (where `PORT` corresponds to the mapped value in `.env`) to interact with the GraphQL playground for this server.

3. To run the unit tests, run `deno task test` in the *root* directory of this codebase.

The unit tests will utilize the same Postgres database as the backend server (that starts when you run the command `deno task dev`). The unit tests will reset the Postgres server each time you run it. Thus, please keep in mind that all data in the database *will be erased* when you run the unit tests. 
