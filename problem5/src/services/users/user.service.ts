import { Repository } from 'typeorm';
import { User } from './user.entity';
import { AppDataSource } from '../../config/db';

export class UserService {
  private repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  async create(data: Partial<User>) {
    const user = this.repository.create(data);
    return await this.repository.save(user);
  }

  async findAll() {
    return await this.repository.find();
  }

  async findById(id: number) {
    return await this.repository.findOne({ where: { id } });
  }

  async update(id: number, data: Partial<User>) {
    await this.repository.update(id, data);
    return await this.repository.findOne({ where: { id } });
  }

  async delete(id: number) {
    return await this.repository.delete(id);
  }
}
