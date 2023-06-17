import * as dotenv from 'dotenv';
dotenv.config();
export const user = process.env.DB_USERNAME;
export const PW = process.env.DB_PWD;
export const name = process.env.DB_NAME;
export const secret = process.env.JWT_SECRET;
