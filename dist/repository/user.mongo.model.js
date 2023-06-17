import { Schema, model } from 'mongoose';
const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    Enemies: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Users',
        },
    ],
    Friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Users',
        },
    ],
});
userSchema.set('toJSON', {
    transform(_document, returnedObject) {
        returnedObject.id = returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject._id;
        delete returnedObject.password;
    },
});
export const UserModel = model('User', userSchema, 'Users');
