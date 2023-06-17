/* eslint-disable padding-line-between-statements */
import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../types/httperror.js';
import { AuthServices, PayloadToken } from '../services/auth.js';
import createDebug from 'debug';
import { Repo } from '../repository/repo.js';
import { User } from '../entities/user.js';
const debug = createDebug('W6: AuthInterceptor');

export class AuthInterceptor {
  constructor(private UserRepo: Repo<User>) {
    debug('Intantiated');
  }

  logged(req: Request, res: Response, next: NextFunction) {
    try {
      const authHeader = req.get('Authorization');
      if (!authHeader) {
        throw new HttpError(401, 'Not Authorized', 'Not Authorization header');
      }
      if (!authHeader.startsWith('Bearer')) {
        throw new HttpError(
          401,
          'Not Authorized',
          'No Bearer in Authorization Header'
        );
      }

      const token = authHeader.slice(7);
      const payload = AuthServices.verifyJWTGettingPayload(token);

      req.body.tokenPayload = payload;
      next();
    } catch (error) {
      next(error);
    }
  }

  async authorized(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.body.tokenPayload) {
        throw new HttpError(
          401,
          'Token not found',
          'Token not found in Authorized interceptor'
        );
      }
      const { id: userId } = req.body.tokenPayload as PayloadToken;
      const { id: bookId } = req.params;

      const user = await this.UserRepo.queryById(bookId);

      // user.Enemies.map((user) => {
      //   if (user.id !== userId) {
      //     throw new HttpError(401, 'Not authorized', 'Not authorized');
      //   }
      // });
      console.log('---> Owner succesfully identified !');
      next();
    } catch (error) {
      next(error);
    }
  }
}
