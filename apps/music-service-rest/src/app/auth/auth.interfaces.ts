export interface AuthUserName {
  firstName: string;
  lastName: string;
}

export interface AuthUser {
  name: AuthUserName;
  email: string;
}

export interface AuthResponse {
  code: string;
  id_token?: string;
  state?: unknown;
  user?: string;
}

export interface AuthTokens {
  access_token: string;
  expires_in: number;
  id_token: string;
  refresh_token: string;
  token_type: string;
}

export interface JwtClaims {
  iss: string;
  sub: string;
  aud: string;
  iat: number;
  exp: number;
  nonce: string;
  nonce_supported: boolean;
  email: string;
  email_verified: string|boolean;
  is_private_email: string|boolean;
  real_user_status: number;
  transfer_sub: string;
}

export interface JSONWebKey {
  alg: string;
  e: string;
  kid: string;
  kty: string;
  n: string;
  use: string;
}

export interface JSONWebKeySet {
  keys: Array<JSONWebKey>;
}