import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.entity';
import { UsersRepository } from './user.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) { }

  async create(createUser: Omit<User, 'id'>): Promise<User> {
    return this.usersRepository.create(createUser);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.findAll();
  }

  async findById(id: number): Promise<User | undefined> {
    const user = await this.usersRepository.findById(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async update(id: number, updateUser: Partial<User>): Promise<User> {
    const user = await this.usersRepository.update(id, updateUser);
    return user
  }

  async delete(id: number): Promise<void> {
    const deleted = await this.usersRepository.delete(id);
    if (!deleted) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

  }
}
