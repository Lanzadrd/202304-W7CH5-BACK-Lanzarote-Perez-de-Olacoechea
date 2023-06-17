import createDebug from 'debug';
import { Controller } from './controller.js';
const debug = createDebug('---> W6:BookControler <---');
export class FilmController extends Controller {
    repo;
    userRepo;
    // eslint-disable-next-line no-unused-vars
    constructor(repo, userRepo) {
        super();
        this.repo = repo;
        this.userRepo = userRepo;
        debug('Instantiated');
    }
    async post(req, res, next) {
        try {
            const { id: userId } = req.body.tokenPayload;
            const user = await this.userRepo.queryById(userId);
            delete req.body.tokenPayload;
            req.body.owner = userId;
            const newFilm = await this.repo.create(req.body);
            user.films.push(newFilm);
            this.userRepo.update(userId, user);
            res.status(201);
            res.send(newFilm);
        }
        catch (error) {
            next(error);
        }
    }
}
