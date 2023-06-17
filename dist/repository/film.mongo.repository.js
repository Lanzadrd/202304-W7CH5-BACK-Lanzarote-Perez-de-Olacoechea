import createDebug from 'debug';
import { FilmModel } from './film.mongo.model.js';
import { HttpError } from '../types/httperror.js';
const debug = createDebug('W6:SampleRepo');
export class FilmsRepo {
    constructor() {
        debug('Books Repo');
    }
    async query() {
        console.log('-------MongoDB-------');
        const allData = await FilmModel.find()
            .populate('owner', { books: 0 })
            .exec();
        return allData;
    }
    async queryById(id) {
        const result = await FilmModel.findById(id).populate('owner').exec();
        console.log('-------MongoDB-(ID)------');
        if (result === null)
            throw new Error('Bad ID for the query');
        return result;
    }
    async search({ key, value, }) {
        const result = await FilmModel.find({ [key]: value }).exec();
        return result;
    }
    async create(data) {
        const result = await FilmModel.create(data);
        console.log('-------MongoDB--(create)-----');
        console.log(`creating new Object.....`);
        return result;
    }
    async update(id, data) {
        const newFilm = await FilmModel.findByIdAndUpdate(id, data, {
            new: true,
        }).exec();
        console.log('-------MongoDB--(update)-----');
        if (newFilm === null)
            throw new HttpError(404, 'Not found', 'Bad ID for the update');
        return newFilm;
    }
    async delete(id) {
        const result = FilmModel.findByIdAndDelete(id).exec();
        console.log('-------MongoDB--(delete)-----');
        console.log(`deleteing ID: ${id}`);
        if (result === null)
            throw new HttpError(404, 'Not found', 'Bad ID for the delete');
    }
}
