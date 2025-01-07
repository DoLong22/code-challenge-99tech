import { Request, Response } from 'express';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { validate } from 'class-validator';

export class UserController {
  private service: UserService;

  constructor() {
    this.service = new UserService();
  }

  async create(req: Request, res: Response) {
    const dto = Object.assign(new CreateUserDto(), req.body);
    const errors = await validate(dto);
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }
    const user = await this.service.create(dto);
    res.status(201).json(user);
  }

  async findAll(req: Request, res: Response) {
    const users = await this.service.findAll();
    res.status(200).json(users);
  }

  async findById(req: Request, res: Response) {
    const user = await this.service.findById(Number(req.params.id));
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  }

  async update(req: Request, res: Response) {
    const dto = Object.assign(new UpdateUserDto(), req.body);
    const errors = await validate(dto);
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }
    const user = await this.service.update(Number(req.params.id), dto);
    res.status(200).json(user);
  }

  async delete(req: Request, res: Response) {
    await this.service.delete(Number(req.params.id));
    res.status(200).json({ message: 'User deleted' });
  }
}
