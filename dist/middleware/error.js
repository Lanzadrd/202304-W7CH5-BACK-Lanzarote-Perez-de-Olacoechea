import { HttpError } from '../types/httperror.js';
import mongoose from 'mongoose';
import debug from 'debug';
export const errorHandler = (error, _req, res, _next) => {
    debug('Error Middleware');
    if (error instanceof HttpError) {
        console.error(error.status, error.statusMessage, error.message);
        res.status(error.status);
        res.statusMessage = error.message;
        res.send({
            status: error.status + ' ' + error.statusMessage,
            error: error.message,
        });
        return;
    }
    console.error(error);
    res.status(500);
    res.send({
        error: error.message,
    });
    if (error instanceof mongoose.Error.ValidationError) {
        console.error('400 Bad Request', error.message);
        res.status(400);
        res.statusMessage = 'Bad request';
        res.send({
            error: error.message,
        });
    }
};
