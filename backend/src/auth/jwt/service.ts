import * as assert from 'assert';
import * as jose from 'jose';

import AuthService from '../service.ts';
import loadEnv from '../../system/env.ts';
import {JwtContents} from '../types.ts';

const env = await loadEnv("./.env");
const {publicKey, privateKey} = await jose.generateKeyPair(
  env.SECRET_ALG
);

export default class JwtService {
  private algorithm!: string;
  private issuer!: string;
  private audience!: string;
  private static publicKey: jose.KeyLike;
  private static privateKey: jose.KeyLike;

  constructor() {
    this.algorithm = env.SECRET_ALG as string;
    this.issuer = env.JWT_ISSUER as string;
    this.audience = env.JWT_AUDIENCE as string;

    JwtService.publicKey = publicKey;
    JwtService.privateKey = privateKey;
    return;
  }

  public sign(contents: JwtContents) {
    return new jose.SignJWT(contents)
    .setProtectedHeader({
      alg: this.algorithm,
    })
      .setIssuedAt()
      .setIssuer(this.issuer)
      .setAudience(this.audience)
      .setExpirationTime("2h")
      .sign(JwtService.privateKey);
  }

  public async verify(accessToken: string, scopes: string[]) {
    return await jose.jwtVerify(
      accessToken,
      JwtService.publicKey,
      {
        issuer: this.issuer,
        audience: this.audience,
      }
    )
    .then(({payload, protectedHeader}) => {
      assert.assertEquals(protectedHeader.alg, this.algorithm);
      assert.assertEquals(typeof payload.id, typeof 'string');
      assert.assertEquals(payload.iss, this.issuer);
      assert.assertEquals(payload.aud, this.audience);
      return payload;
    })
    .then(async (payload) => {
      const id = payload.id as string;
      assert.assert(
        this.hasScopes(await AuthService.getScopes(id), scopes)
      );
      return;
    });
  }

  private hasScopes(
    userScopes: string[],
    requiredScopes: string[]
  ) {
    for (const scope of userScopes) {
      if (requiredScopes.includes(scope)) return true;
    }
    return false;
  }
}