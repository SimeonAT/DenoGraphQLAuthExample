import client from '../system/db/db.ts';
import {JwtContents} from './types.ts';

export default class AuthService {
  /**
   * Returns whether or not a user's login information
   * is correct.
   */
  public async authenticate(email: string, password: string):
  Promise<JwtContents> {
    const {rows} = await client.queryArray(
      `SELECT id FROM auth WHERE email = $1
       AND passwordhash = crypt(
        $2,
        (SELECT salt FROM auth WHERE email = $1)
      );`,
      [email, password],
    );

    if (rows.length == 0) {
      throw new Error('Failed to login');
    }
    return {
      id: rows[0][0] as string,
    };
  }

  public async getUsername(id: string) {
    const {rows} = await client.queryArray(
      `SELECT userdata->>'username' FROM usertable WHERE id = $1`,
      [id]
    );
    return rows[0][0] as string;
  }

  public static async getScopes(id: string) {
    const {rows} = await client.queryArray(
      `SELECT scopes FROM auth WHERE id = $1`,
      [id],
    );
    return rows[0][0] as string[];
  }
}
