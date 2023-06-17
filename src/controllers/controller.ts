/* eslint-disable no-useless-constructor */
import { NextFunction, Request, Response } from 'express';
import { Repo } from '../repository/repo.js';
import { ApiResponse } from '../types/response.api.js';

export abstract class Controller<T extends { id: string | number }> {
  protected repo!: Repo<T>;

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      // Const length = req.query.length || 20
      // Const page = req.query.page || 1
      const items = await this.repo.query();
      const response: ApiResponse = {
        items,
        page: 1,
        count: items.length,
      };
      console.log(req.body);
      res.status(200);
      res.send(response);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(200);
      res.send(await this.repo.queryById(req.params.id));
    } catch (error) {
      next(error);
    }
  }

  async post(req: Request, res: Response, next: NextFunction) {
    try {
      await this.repo.create(req.body);
      res.status(201);
      res.send(`Succesfully added new element to database!`);
    } catch (error) {
      next(error);
    }
  }

  async patch(req: Request, res: Response, next: NextFunction) {
    try {
      await this.repo.update(req.params.id, req.body);
      res.status(202);
      res.send('Succesfully patched element!');
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await this.repo.delete(req.params.id);
      res.status(204);
      res.send('Succesfully deleted element!');
    } catch (error) {
      next(error);
    }
  }
}
