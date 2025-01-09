import { Like, Repository } from 'typeorm';
import { User } from './user.entity';
import { AppDataSource } from '../../config/db';
import { FilterUserDto } from './user.dto';

export class UserService {
  private repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  create(data: Partial<User>) {
    const user = this.repository.create(data);
    return this.repository.save(user);
  }

  async findAll(filters?: FilterUserDto) {
    const { page = 1, limit = 10, keyword } = filters || {};

    const [items, total] = await this.repository.findAndCount({
      where: [
        { fullname: Like(`%${keyword}%`) },
        { email: Like(`%${keyword}%`) }
      ],
      skip: (page - 1) * limit,
      take: limit,
      order: {
        createdAt: 'DESC'
      }
    });

    return {
      items,
      meta: {
        page,
        limit,
        total,
        pageCount: Math.ceil(total / limit)
      }
    };
  }

  findById(id: number) {
    return this.repository.findOne({ where: { id } });
  }

  findByEmail(email: string) {
    return this.repository.findOne({ where: { email } });
  }

  async update(id: number, data: Partial<User>) {
    await this.repository.update(id, data);
    return this.repository.findOne({ where: { id } });
  }

  delete(id: number) {
    return this.repository.delete(id);
  }

  softDelete(id: number) {
    return this.repository.softDelete(id);
  }
}
