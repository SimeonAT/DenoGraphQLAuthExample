import * as jose from "jose";

export interface LoginRequest {
  email: string,
  password: string,
}

export interface LoginResponse {
  accessToken: string,
  username: string,
}

export type JwtContents = jose.JWTPayload & {
  id: string,
}