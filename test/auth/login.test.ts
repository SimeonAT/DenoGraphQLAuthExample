import * as superoak from "superoak";
import * as bdd from "bdd";
import * as assert from "assert";

import {createApp} from "../../src/app.ts";
import {simeon} from './login.ts';
import DatabaseService from "../../src/system/db/service.ts";

bdd.beforeAll(async () => await new DatabaseService().initDb());

bdd.it("Login returns username and access token", async () => {
  const request = await superoak.superoak(createApp());

  await request.post('/graphql')
    .set("Content-Type", "application/json")
    .send({
      "query": `{
        login(
          email: "${simeon.email}", 
          password: "${simeon.password}"
        ) {
          accessToken
          username
        }
      }`
    })
    .expect(200)
    .then((response) => {
      assert.assertExists(response.body);
      assert.assertExists(response.body.data);
      assert.assertExists(response.body.data.login);
      return response.body.data.login;
    })
    .then((login) => {
      assert.assertExists(login.username);
      assert.assertMatch(login.username, /SimeonTG/);

      assert.assertExists(login.accessToken);
      assert.assert(typeof login.accessToken, typeof "string");
      return;
    });

  return;
});

bdd.it("Login with an incorrect password", async () => {
  const request = await superoak.superoak(createApp());

  await request.post('/graphql')
    .set("Content-Type", "application/json")
    .send({
      "query": `{
        login(
          email: "${simeon.email}", 
          password: "incorrect"
        ) {
          accessToken
          username
        }
      }`
    })
    .then((response) => {
      assert.assertExists(response.body);
      assert.assertExists(response.body.errors);
      return response.body.errors;
    })
    .then((errors) => {
      assert.assertExists(errors[0].message);
      assert.assertMatch(
        errors[0].message,
        /Failed to login/,
      )
      return;
    });
});