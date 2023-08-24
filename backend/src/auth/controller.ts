// deno-lint-ignore-file no-explicit-any
import JwtService from './jwt/service.ts';
import AuthService from './service.ts';
import { 
  LoginRequest,
  LoginResponse,
} from "./types.ts";

export default class AuthController {
  public async authenticate(_: any, args: LoginRequest):
  Promise<LoginResponse> {
    const auth = new AuthService();
    const jwt = new JwtService();

    return await auth.authenticate(
      args.email,
      args.password,
    ).then(async (contents) => {
      return {
        accessToken: await jwt.sign(contents),
        username: await auth.getUsername(contents.id),
      };
    });
  }

  public authorized() {
    return 'You are authorized!';
  }

  public admin() {
    return 'You have admin permissions!';
  }
}