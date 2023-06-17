import { Schema, model } from 'mongoose';
const filmSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    director: {
        type: String,
        required: true,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
});
filmSchema.set('toJSON', {
    transform(_document, returnedObject) {
        returnedObject.id = returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject._id;
        delete returnedObject.PW;
    },
});
export const FilmModel = model('Film', filmSchema, 'Films');
