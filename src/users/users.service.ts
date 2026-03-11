import { Injectable } from '@nestjs/common';
import { UsersRepository } from './user.repository';
import { CreateUserDto, UpdateUserDto, RespondUserDto } from './dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) { }

  async create(createUserDto: CreateUserDto): Promise<RespondUserDto> {
    return await this.usersRepository.create(createUserDto);
  }

  async findAll(): Promise<RespondUserDto[]> {
    return this.usersRepository.findAll();
  }

  async findById(id: number): Promise<RespondUserDto | undefined> {
    const user = await this.usersRepository.findById(id);
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<RespondUserDto> {
    const user = await this.usersRepository.update(id, updateUserDto);
    return user
  }

  async delete(id: number): Promise<boolean> {
    return await this.usersRepository.delete(id);
  }
}
