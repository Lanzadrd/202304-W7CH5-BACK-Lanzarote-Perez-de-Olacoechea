import createDebug from 'debug';
import { Controller } from './controller.js';
const debug = createDebug('---> W6:SneakerController <---');
export class SneakersController extends Controller {
    repo;
    // eslint-disable-next-line no-unused-vars
    constructor(repo) {
        super();
        this.repo = repo;
        debug('Instantiated');
    }
}
