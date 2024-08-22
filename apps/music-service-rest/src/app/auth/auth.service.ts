import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as jwt from 'jsonwebtoken';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ConfigService } from '@nestjs/config';
import *  as querystring from 'querystring';
import { AuthTokens, JSONWebKey, JSONWebKeySet, JwtClaims } from './auth.interfaces';
import { Buffer } from 'buffer';
import * as asn1 from 'asn1.js';

@Injectable()
export class AuthService {
  private readonly appleTeamID: string;
  private readonly appleClientID: string;
  private readonly appleKeyID: string;
  private readonly appleRedirectURI: string;
  private readonly appleKey: string;

  constructor(
    private configService: ConfigService
  ) {
    this.appleTeamID = this.configService.get<string>('APPLE_TEAM_ID');
    this.appleClientID = this.configService.get<string>('APPLE_CLIENT_ID');
    this.appleKeyID = this.configService.get<string>('APPLE_KEY_ID');
    this.appleRedirectURI = this.configService.get<string>('APPLE_REDIRECT_URI');
    this.appleKey = fs.readFileSync(`${process.cwd()}/secrets/AuthKey_${this.appleKeyID}.p8`, 'utf8');
  }
  
  async getAuthTokens(authorizationCode: string): Promise<AuthTokens> {
    const clientSecret = this.getClientSecret();
    const reqURL: string = 'https://appleid.apple.com/auth/token';
    const reqData: string = querystring.stringify({
      client_id: this.appleClientID,
      client_secret: clientSecret,
      grant_type: 'authorization_code',
      code: authorizationCode,
      redirect_uri: this.appleRedirectURI
    });
    const reqConfig: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };
    let res: AxiosResponse<AuthTokens>;
    try {
      res = await axios.post(reqURL, reqData, reqConfig)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error('Error response:', axiosError.response.data);
          console.error('Status code:', axiosError.response.status);
          console.error('Headers:', axiosError.response.headers);
        } else if (axiosError.request) {
          // The request was made but no response was received
          console.error('No response received:', axiosError.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error('Error message:', axiosError.message);
        }
      } else {
        // Non-Axios error
        console.error('Error:', error);
      }
    }
    if (!res) {
      return Promise.reject('Error requesting auth tokens');
    }
    return Promise.resolve(res.data);
  }

  async getUserEmail(idToken: string): Promise<string> {
    const jwtClaims: JwtClaims = await this.getJwtClaims(idToken);
    return jwtClaims.email;
  }

  private getClientSecret(): string {
    const jwtSignPayload: object = {
      iss: this.appleTeamID,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + (86400 * 180), // 180 days
      aud: 'https://appleid.apple.com',
      sub: this.appleClientID
    };
    const jwtSecret: jwt.Secret = this.appleKey;
    const jwtSignOptions: jwt.SignOptions = {
      algorithm: 'ES256',
      header: {
        alg: 'ES256',
        kid: this.appleKeyID,
      }
    };
    return jwt.sign(jwtSignPayload, jwtSecret, jwtSignOptions);
  }

  private async getJwtClaims(idToken: string): Promise<JwtClaims> {
    const decodedIdToken: any = jwt.decode(idToken, {complete: true});
    const jsonWebKeySetResponse: AxiosResponse<JSONWebKeySet> = await axios.get('https://appleid.apple.com/auth/keys');
    const jsonWebKeySet: JSONWebKeySet = jsonWebKeySetResponse.data;
    const jsonWebKey: JSONWebKey = jsonWebKeySet.keys.find((key: JSONWebKey) => key.kid === decodedIdToken.header.kid);
    const jwtSecret: jwt.Secret = this.convertJsonWebKeyToPEM(jsonWebKey);
    const jwtVerifyOptions: jwt.VerifyOptions = {
      algorithms: ['RS256']
    };
    try {
      const jwtClaims = jwt.verify(idToken, jwtSecret, jwtVerifyOptions);
      return jwtClaims as JwtClaims;
    } catch (error) {
      console.error('Invalid ID token:', error);
      return null;
    };
  }

  private convertJsonWebKeyToPEM(jsonWebKey: JSONWebKey): string {
    if (!this.isValidBase64URL(jsonWebKey.n) || !this.isValidBase64URL(jsonWebKey.e)) {
      throw new Error('Invalid base64url string');
    }
    const RSAPublicKey = asn1.define('RSAPublicKey', function() {
      this.seq().obj(
        this.key('modulus').int(),
        this.key('publicExponent').int()
      );
    });
    const modulus = Buffer.from(jsonWebKey.n, 'base64');
    const exponent = Buffer.from(jsonWebKey.e, 'base64');
    const rsaPublicKey = {
      modulus: new asn1.bignum(modulus),
      publicExponent: new asn1.bignum(exponent)
    };
    const der = RSAPublicKey.encode(rsaPublicKey, 'der');
    const derBase64 = der.toString('base64');
    const pem = `-----BEGIN RSA PUBLIC KEY-----\n${derBase64.match(/.{1,64}/g).join('\n')}\n-----END RSA PUBLIC KEY-----`;
    return pem;
  }
  
  private isValidBase64URL(base64URL: string): boolean {
    const base64URLPattern: RegExp = /^[A-Za-z0-9\-_]+$/;
    return base64URLPattern.test(base64URL);
  }

}