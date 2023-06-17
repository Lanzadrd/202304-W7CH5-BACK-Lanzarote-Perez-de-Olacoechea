import { hash, compare } from 'bcrypt';
import pkg from 'jsonwebtoken';
import { secret } from '../config.js';
import { HttpError } from '../types/httperror.js';

export type PayloadToken = {
  id: string;
  userName: string;
} & pkg.JwtPayload;

export class AuthServices {
  private static salt = 10;

  static createJWT(payload: PayloadToken) {
    const token = pkg.sign(payload, secret!);
    return token;
  }

  static verifyJWTGettingPayload(token: string) {
    console.log({ token });
    try {
      const result = pkg.verify(token, secret!);
      if (typeof result === 'string') {
        throw new HttpError(498, 'Invalid Token', result);
      }

      return result as PayloadToken;
    } catch (error) {
      throw new HttpError(498, 'Invalid Token', (error as Error).message);
    }
  }

  static hash(value: string) {
    return hash(value, AuthServices.salt);
  }

  static compare(value: string, hash: string) {
    return compare(value, hash);
  }
}
