CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TABLE IF EXISTS usertable;
DROP TABLE IF EXISTS auth;

CREATE TABLE auth (id uuid PRIMARY KEY DEFAULT uuid_generate_v4(), email VARCHAR(100) UNIQUE, passwordhash VARCHAR(64), salt VARCHAR(32), scopes jsonb);
CREATE TABLE usertable (id uuid REFERENCES auth(id), userdata jsonb);