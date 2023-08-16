import * as superoak from "superoak";
import * as bdd from "bdd";
import * as assert from "assert";

import {createApp} from "../../src/app.ts";
import {simeon, login} from './login.ts';
import DatabaseService from "../../src/system/db/service.ts";

bdd.beforeAll(async () => await new DatabaseService().initDb());

bdd.it("Authorization after login", async () => {
  const token = await login(simeon);

  const request = await superoak.superoak(createApp());
  await request.post('/graphql')
    .set("Content-Type", "application/json")
    .set("Authorization", `Bearer ${token}`)
    .send({
      "query": `{
        auth
      }`
    })
    .expect(200)
    .then((response) => {
      assert.assertExists(response.body);
      assert.assertExists(response.body.data);
      assert.assertExists(response.body.data.auth);
      assert.assertMatch(response.body.data.auth, /You are authorized/);
      return;
    });
  return;
});

bdd.it("Authorization with an invalid access token", async () => {
  const request = await superoak.superoak(createApp());
  await request.post('/graphql')
    .set("Content-Type", "application/json")
    .set("Authorization", `Bearer invalid-token`)
    .send({
      "query": `{
        auth
      }`
    })
    .then((response) => {
      assert.assertExists(response.body);
      assert.assertExists(response.body.errors);
      assert.assertExists(response.body.errors[0]);
      assert.assertMatch(response.body.errors[0].message, /Unauthorized/);
      return;
    });
});

bdd.it("'Bearer' is not included in the header", async () => {
  const token = await login(simeon);

  const request = await superoak.superoak(createApp());
  await request.post('/graphql')
    .set("Content-Type", "application/json")
    .set("Authorization", `not-bearer ${token}`)
    .send({
      "query": `{
        auth
      }`
    })
    .then((response) => {
      assert.assertExists(response.body);
      assert.assertExists(response.body.errors);
      assert.assertExists(response.body.errors[0]);
      assert.assertMatch(response.body.errors[0].message, /Unauthorized/);
      return;
    });
});

bdd.it("There is no Authentication header", async () => {
  const request = await superoak.superoak(createApp());
  await request.post('/graphql')
    .set("Content-Type", "application/json")
    .send({
      "query": `{
        auth
      }`
    })
    .then((response) => {
      assert.assertExists(response.body);
      assert.assertExists(response.body.errors);
      assert.assertExists(response.body.errors[0]);
      assert.assertMatch(response.body.errors[0].message, /Unauthorized/);
      return;
    });
});