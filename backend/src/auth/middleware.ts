// deno-lint-ignore-file no-explicit-any
import * as assert from "assert";

import JwtService from './jwt/service.ts';

/**
 * Returns a middleware function that authorizes a user
 * depending on whether or not their JWT is valid.
 */
export default function authorize(next: any, scopes: string[]) {
  return async (obj: any, args: any, context: any, info: any) => {
    const jwt = new JwtService();

    try {
      const request = context.request;
      const bearerAuth = request.headers.get('authorization');
      const accessToken = bearerAuth?.split(' ')[1];
      assert.assertEquals(bearerAuth?.split(' ')[0], 'Bearer');

      return await jwt.verify(accessToken, scopes)
        .then(() => {
          return next(obj, args, context, info);
        });
    }
    catch {
      throw new Error('Unauthorized');
    }
  }
}