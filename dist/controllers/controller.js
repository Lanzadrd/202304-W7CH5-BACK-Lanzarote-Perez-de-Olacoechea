export class Controller {
    repo;
    async getAll(req, res, next) {
        try {
            // Const length = req.query.length || 20
            // Const page = req.query.page || 1
            const items = await this.repo.query();
            const response = {
                items,
                page: 1,
                count: items.length,
            };
            console.log(req.body);
            res.status(200);
            res.send(response);
        }
        catch (error) {
            next(error);
        }
    }
    async getById(req, res, next) {
        try {
            res.status(200);
            res.send(await this.repo.queryById(req.params.id));
        }
        catch (error) {
            next(error);
        }
    }
    async post(req, res, next) {
        try {
            await this.repo.create(req.body);
            res.status(201);
            res.send(`Succesfully added new element to database!`);
        }
        catch (error) {
            next(error);
        }
    }
    async patch(req, res, next) {
        try {
            await this.repo.update(req.params.id, req.body);
            res.status(202);
            res.send('Succesfully patched element!');
        }
        catch (error) {
            next(error);
        }
    }
    async delete(req, res, next) {
        try {
            await this.repo.delete(req.params.id);
            res.status(204);
            res.send('Succesfully deleted element!');
        }
        catch (error) {
            next(error);
        }
    }
}
