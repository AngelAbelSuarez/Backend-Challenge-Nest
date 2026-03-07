import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  async create(@Body() createUser: Omit<User, 'id'>): Promise<User> {
    return this.usersService.create(createUser);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<User | undefined> {
    return this.usersService.findById(Number(+id));
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUser: Partial<User>): Promise<User> {
    return this.usersService.update(+id, updateUser);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.usersService.delete(+id);
  }
}
