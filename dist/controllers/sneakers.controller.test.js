import { SneakersController } from './sneakers.controller';
jest.mock('fs/promises');
describe('Given sneaker controller', () => {
    describe('When its instanciated', () => {
        const mockRepo = {
            query: jest.fn(),
            queryByI: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        };
        const req = {};
        const res = {
            send: jest.fn(),
        };
        const next = jest.fn;
        const controller = new SneakersController(mockRepo);
        test('Then method query should...', async () => {
            await controller.getAll(req, res, next);
            expect(res.send).toHaveBeenCalled();
            expect(mockRepo.query).toHaveBeenCalled();
        });
        test('Then method getById should...', async () => {
            await controller.getById(req, res, next);
            expect(res.send).toHaveBeenCalled();
            expect(mockRepo.queryById).toHaveBeenCalled();
        });
        test('Then method patch should...', async () => {
            await controller.patch(req, res, next);
            expect(res.send).toHaveBeenCalled();
            expect(mockRepo.update).toHaveBeenCalled();
        });
        test('Then method query should...', async () => {
            await controller.post(req, res, next);
            expect(res.send).toHaveBeenCalled();
            expect(mockRepo.create).toHaveBeenCalled();
        });
        test('Then method query should...', async () => {
            await controller.delete(req, res, next);
            expect(res.send).toHaveBeenCalled();
            expect(mockRepo.delete).toHaveBeenCalled();
        });
    });
});
