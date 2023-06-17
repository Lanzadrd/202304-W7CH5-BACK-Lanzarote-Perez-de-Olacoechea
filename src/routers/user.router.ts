import { Router as createRouter } from 'express';
import { UserRepo } from '../repository/user.mongo.repository.js';
import createDebug from 'debug';
import { UserController } from '../controllers/user.controller.js';
import { Repo } from '../repository/repo.js';
import { User } from '../entities/user.js';

const debug = createDebug('--> SocialClub: UserRouter');

const repo: Repo<User> = new UserRepo() as unknown as Repo<User>;
const controller = new UserController(repo);
export const userRouter = createRouter();

debug('Ready');
userRouter.get('/', controller.getAll.bind(controller));
userRouter.post('/register', controller.register.bind(controller));
userRouter.patch('/login', controller.login.bind(controller));
userRouter.patch('/update/:id', controller.update.bind(controller));
// Falta comprobacion de (user = userToDelete)
userRouter.delete('/delete', controller.delete.bind(controller));
