import * as superoak from "superoak";
import * as bdd from "bdd";
import * as assert from "assert";


import {createApp} from "../../src/app.ts";
import {simeon, rocket, login} from './login.ts';
import DatabaseService from "../../src/system/db/service.ts";

bdd.beforeAll(async () => await new DatabaseService().initDb());

bdd.it("Cannot access admin route without admin permissions",
async () => {
  const token = await login(simeon);

  const request = await superoak.superoak(createApp());
  await request.post('/graphql')
    .set("Content-Type", "application/json")
    .set("Authorization", `Bearer ${token}`)
    .send({
      "query": `{
        admin
      }`
    })
    .then((response) => {
      assert.assertExists(response.body);
      assert.assertExists(response.body.errors);
      assert.assertExists(response.body.errors[0]);
      assert.assertMatch(response.body.errors[0].message, /Unauthorized/);
      return;
    });
  return;
});

bdd.it("Access the admin route with admin permissions",
async () => {
  const token = await login(rocket);

  const request = await superoak.superoak(createApp());
  await request.post('/graphql')
    .set("Content-Type", "application/json")
    .set("Authorization", `Bearer ${token}`)
    .send({
      "query": `{
        admin
      }`
    })
    .then((response) => {
      assert.assertExists(response.body);
      assert.assertExists(response.body.data);
      assert.assertMatch(response.body.data.admin, /admin/);
      return;
    });
  return;
});