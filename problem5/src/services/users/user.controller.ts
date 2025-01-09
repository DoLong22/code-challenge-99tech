import { Request, Response, NextFunction } from 'express';
import { UserService } from './user.service';
import { CustomError } from '../../common/CustomError';

export class UserController {
  private service: UserService;

  constructor() {
    this.service = new UserService();
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await this.service.create(req.body);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }

  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await this.service.findAll(req.query);
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }

  async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await this.service.findById(Number(req.params.id));
      if (!user) {
        throw new CustomError(404, 'User not found', []);
      }
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.body.email) {
        const userRepository = await this.service.findByEmail(req.body.email);
        if (userRepository && userRepository.id !== Number(req.params.id)) {
          throw new CustomError(400, 'Email already exists', []);
        }
      }
      const user = await this.service.update(Number(req.params.id), req.body);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await this.service.softDelete(Number(req.params.id));
      res.status(200).json({ message: 'User deleted' });
    } catch (error) {
      next(error);
    }
  }
}
