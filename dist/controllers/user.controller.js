import createDebug from 'debug';
import { AuthServices } from '../services/auth.js';
import { HttpError } from '../types/httperror.js';
import { Controller } from './controller.js';
const debug = createDebug('---> W6:UserController <---');
export class UserController extends Controller {
    repo;
    // eslint-disable-next-line no-unused-vars
    constructor(repo) {
        super();
        this.repo = repo;
        debug('Instantiated');
    }
    async register(req, res, next) {
        try {
            const pw = await AuthServices.hash(req.body.password);
            req.body.password = pw;
            res.status(201);
            res.send(await this.repo.create(req.body));
        }
        catch (error) {
            next(error);
        }
    }
    async login(req, res, next) {
        try {
            if (!req.body.user || !req.body.password) {
                throw new HttpError(400, 'Bad request', "User and password don't match");
            }
            let data = await this.repo.search({
                key: `userName`,
                value: req.body.user,
            });
            if (!data.length) {
                data = await this.repo.search({
                    key: `email`,
                    value: req.body.user,
                });
            }
            if (!data.length) {
                throw new HttpError(400, 'Bad request', "User and password don't match");
            }
            const isUserValid = await AuthServices.compare(req.body.password, data[0].password);
            if (!isUserValid) {
                throw new HttpError(400, 'Bad request', "User and password don't match");
            }
            const payload = {
                id: data[0].id,
                userName: data[0].userName,
            };
            const token = AuthServices.createJWT(payload);
            const response = {
                token,
                user: data[0],
            };
            console.log(`---------------User ${req.body.user} logged in!--------------`);
            res.send(response);
        }
        catch (error) {
            next(error);
        }
    }
    async delete(req, res, next) {
        try {
            if (!req.body.userToDelete) {
                throw new HttpError(404, 'Bad request', 'Missing User ID');
            }
            const response = this.repo.delete(req.body.userToDelete);
            console.log(`--> Succesfully deleted User: ${req.body.userToDelete}`);
            res.send(response);
        }
        catch (error) {
            next(error);
        }
    }
    async update(req, res, next) {
        try {
            if (!req.params) {
                throw new HttpError(404, 'Bad request', 'Missing User ID');
            }
            const response = this.repo.update(req.params.id, req.body);
            console.log(`--> Succesfully updated User: ${req.params.id}`);
            res.send(response);
        }
        catch (error) {
            next(error);
        }
    }
}
