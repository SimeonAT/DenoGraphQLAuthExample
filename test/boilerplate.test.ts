import * as superoak from "superoak";
import * as bdd from "bdd";
import * as assert from "assert";

import {createApp} from "../src/app.ts";

bdd.it("The server is on", async () => {
  const request = await superoak.superoak(createApp());
  await request.post("/graphql")
    .send({
      "query": `{
        backend
      }`
    })
    .expect(200)
    .then((response) => {
      assert.assertExists(response.body.data);
      return response.body.data;
    })
    .then((data) => {
      assert.assertExists(data.backend);
      assert.assertMatch(data.backend, /working/);
      return;
    });
  return;
});

bdd.it("404 not found when not using GraphQL", async () => {
  const request = await superoak.superoak(createApp());
  await request.post('/').expect(404);
  return;
});