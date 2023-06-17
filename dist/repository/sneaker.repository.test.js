import { SneakersRepo } from './sneaker.repository';
import fs from 'fs/promises';
jest.mock('fs/promises');
describe('Given sample repo class', () => {
    describe('When is instanciated', () => {
        const repo = new SneakersRepo();
        test('Then method query should...', async () => {
            fs.readFile.mockResolvedValueOnce(`{}`);
            await repo.query();
            expect(fs.readFile).toHaveBeenCalled();
        });
        test('Then method readById should...', async () => {
            const mockSample = [{ id: '1' }];
            fs.readFile.mockResolvedValueOnce(JSON.stringify(mockSample));
            const result = await repo.queryById('1');
            expect(fs.readFile).toHaveBeenCalled();
            expect(result).toEqual(mockSample);
        });
        test('Then method create should...', async () => {
            const mockSample = {
                id: '1',
                name: 'Jordan 1',
                sku: '22222',
                brand: 'Jordan',
            };
            const result = await repo.create({
                id: '1',
                name: 'Jordan 1',
                sku: '22222',
                brand: 'Jordan',
            });
            expect(fs.writeFile).toHaveBeenCalled();
            expect(result).toEqual(mockSample);
        });
        test('Then method create should...', async () => {
            const mockSample = {
                id: '1',
                name: 'Jordan 1',
                sku: '22222',
                brand: 'Jordan',
            };
            const result = await repo.create({
                id: '1',
                name: 'Jordan 1',
                sku: '22222',
                brand: 'Jordan',
            });
            expect(fs.writeFile).toHaveBeenCalled();
            expect(result).toEqual(mockSample);
        });
        test('Then method create should...', async () => {
            const mockSample = {
                id: '1',
                name: 'Jordan 1',
                sku: '22222',
                brand: 'Jordan',
            };
            const result = await repo.create({
                id: '1',
                name: 'Jordan 1',
                sku: '22222',
                brand: 'Jordan',
            });
            expect(fs.writeFile).toHaveBeenCalled();
            expect(result).toEqual(mockSample);
        });
    });
});
