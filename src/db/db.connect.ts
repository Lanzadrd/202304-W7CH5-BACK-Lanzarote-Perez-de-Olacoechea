import mongoose from 'mongoose';
import { user, PW, name } from '../config.js';

export const dbConnect = () => {
  const uri = `mongodb+srv://${user}:${PW}@cluster0.slzair6.mongodb.net/${name}?retryWrites=true&w=majority`;
  return mongoose.connect(uri);
};
