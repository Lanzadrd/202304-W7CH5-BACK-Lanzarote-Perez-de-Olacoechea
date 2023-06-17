import createDebug from 'debug';
import { UserModel } from './user.mongo.model.js';
import { HttpError } from '../types/httperror.js';
const debug = createDebug('--> SocialClub:');
export class UserRepo {
    constructor() {
        debug('Instantiated', UserModel);
    }
    async query() {
        console.log('-------MongoDB-------');
        const allData = await UserModel.find().exec();
        return allData;
    }
    async search({ key, value, }) {
        const result = await UserModel.find({ [key]: value }).exec();
        return result;
    }
    async queryById(id) {
        const result = await UserModel.findById(id).exec();
        if (result === null)
            throw new HttpError(404, 'Not found', 'Bad ID for the query');
        return result;
    }
    async create(data) {
        const result = await UserModel.create(data);
        console.log('-------MongoDB--(create)-----');
        console.log(`creating new User.....`);
        return result;
    }
    async update(id, data) {
        const newUser = await UserModel.findByIdAndUpdate(id, data, {
            new: true,
        }).exec();
        console.log('-------MongoDB--(update)-----');
        if (newUser === null)
            throw new HttpError(404, 'Not found', 'Bad ID for the update');
        return newUser;
    }
    async delete(id) {
        const result = UserModel.findByIdAndDelete(id).exec();
        console.log('-------MongoDB--(delete)-----');
        console.log(`deleteing ID: ${id}`);
        if (result === null)
            throw new HttpError(404, 'Not found', 'Bad ID for the delete');
    }
}
