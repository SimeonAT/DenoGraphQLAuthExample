import * as superoak from "superoak";

import {createApp} from "../../src/app.ts";
import {LoginRequest} from "../../src/auth/types.ts";

export const simeon: LoginRequest = {
  email: "simeonat@notrealemail.com",
  password: "simeonat",
};

export const rocket: LoginRequest = {
  email: "rocketraccoon@guardians.com",
  password: "raccoon",
};

export async function login(loginInfo: LoginRequest) {
  const request = await superoak.superoak(createApp());
  return await request.post('/graphql')
    .set("Content-Type", "application/json")
    .send({
      "query": `{
        login(
          email: "${loginInfo.email}", 
          password: "${loginInfo.password}"
        ) {
          accessToken
        }
      }`
    })
    .then((response) => response.body.data.login.accessToken);
}