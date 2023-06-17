import { HttpError } from '../types/httperror.js';
import { AuthServices } from '../services/auth.js';
import createDebug from 'debug';
const debug = createDebug('W6: AuthInterceptor');
export class AuthInterceptor {
    UserRepo;
    constructor(UserRepo) {
        this.UserRepo = UserRepo;
        debug('Intantiated');
    }
    logged(req, res, next) {
        try {
            const authHeader = req.get('Authorization');
            if (!authHeader) {
                throw new HttpError(401, 'Not Authorized', 'Not Authorization header');
            }
            if (!authHeader.startsWith('Bearer')) {
                throw new HttpError(401, 'Not Authorized', 'No Bearer in Authorization Header');
            }
            const token = authHeader.slice(7);
            const payload = AuthServices.verifyJWTGettingPayload(token);
            req.body.tokenPayload = payload;
            next();
        }
        catch (error) {
            next(error);
        }
    }
    async authorized(req, res, next) {
        try {
            if (!req.body.tokenPayload) {
                throw new HttpError(401, 'Token not found', 'Token not found in Authorized interceptor');
            }
            const { id: userId } = req.body.tokenPayload;
            const { id: bookId } = req.params;
            const user = await this.UserRepo.queryById(bookId);
            // user.Enemies.map((user) => {
            //   if (user.id !== userId) {
            //     throw new HttpError(401, 'Not authorized', 'Not authorized');
            //   }
            // });
            console.log('---> Owner succesfully identified !');
            next();
        }
        catch (error) {
            next(error);
        }
    }
}
