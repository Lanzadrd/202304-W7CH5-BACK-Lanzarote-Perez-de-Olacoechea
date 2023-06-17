import { hash, compare } from 'bcrypt';
import pkg from 'jsonwebtoken';
import { secret } from '../config.js';
import { HttpError } from '../types/httperror.js';
export class AuthServices {
    static salt = 10;
    static createJWT(payload) {
        const token = pkg.sign(payload, secret);
        return token;
    }
    static verifyJWTGettingPayload(token) {
        console.log({ token });
        try {
            const result = pkg.verify(token, secret);
            if (typeof result === 'string') {
                throw new HttpError(498, 'Invalid Token', result);
            }
            return result;
        }
        catch (error) {
            throw new HttpError(498, 'Invalid Token', error.message);
        }
    }
    static hash(value) {
        return hash(value, AuthServices.salt);
    }
    static compare(value, hash) {
        return compare(value, hash);
    }
}
