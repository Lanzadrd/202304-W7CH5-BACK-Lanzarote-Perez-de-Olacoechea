import fs from 'fs/promises';
import createDebug from 'debug';
const debug = createDebug('W6:SampleRepo');
const file = './data.json';
const createID = () => Math.trunc(Math.random() * 1_000_000).toString();
export class SneakersRepo {
    constructor() {
        debug('Sneakers Repo');
    }
    async query() {
        const stringData = await fs.readFile(file, { encoding: 'utf-8' });
        const aData = JSON.parse(stringData);
        return aData;
    }
    async queryById(id) {
        const allData = await this.query();
        const requestedItem = allData.find((item) => item.id === id);
        if (!requestedItem)
            throw new Error('Bad ID for the query');
        return requestedItem;
    }
    async create(data) {
        const allData = await this.query(); // Tiene que ser string / buffer / typedArray
        const newSneaker = { ...data, id: createID() };
        const result = JSON.stringify([...allData, newSneaker]);
        await fs.writeFile(file, result, { encoding: 'utf8' });
        return newSneaker;
    }
    async update(id, data) {
        const alldata = await this.query();
        let newSneaker = {};
        const updatedData = alldata.map((item) => {
            if (item.id === id) {
                newSneaker = { ...item, ...data };
                return newSneaker;
            }
            return item;
        });
        if ('id' in newSneaker)
            throw new Error('Bad ID for the update');
        await fs.writeFile(file, JSON.stringify(updatedData), null);
        return newSneaker;
    }
    async delete(id) {
        const data = this.query();
        const updatedData = data.filter((item) => id !== item.id);
        if (updatedData.length === data.length)
            throw new Error('Bad ID for the delete');
        await fs.writeFile(file, JSON.stringify(updatedData), null);
    }
}
