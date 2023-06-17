import http from 'http';
import { app } from './app.js';
import * as dotenv from 'dotenv';
import createDebug from 'debug';
import { dbConnect } from './db/db.connect.js';
const debug = createDebug('W6');
dotenv.config();
const PORT = process.env.PORT || 4444;
const server = http.createServer(app);
dbConnect()
    .then((mongoose) => {
    server.listen(PORT);
    debug('--> Conected to database:', mongoose.connection.db.databaseName);
})
    .catch((error) => {
    server.emit('error', error);
});
server.on('listening', () => {
    debug('--> Listening on port ' + PORT);
});
server.on('error', (error) => {
    console.log(error.message);
});
