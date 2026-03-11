import { Injectable, NotFoundException } from "@nestjs/common";
import { User } from "./user.entity";
import { CreateUserDto, UpdateUserDto, RespondUserDto } from './dto';

@Injectable()
export class UsersRepository {
    private users: User[] = [];
    private nextId: number = 1;

    async findAll(): Promise<RespondUserDto[]> {
        const users = this.users
        return users.map(user => new RespondUserDto(user));
    }

    async findById(id: number): Promise<RespondUserDto | undefined> {
        const user = this.users.find(user => user.id === id);
        if (!user) {
            throw new NotFoundException(`User with id ${id} not found`);
        }
        return new RespondUserDto(user);
    }


    async create(createUserDto: CreateUserDto): Promise<RespondUserDto> {
        const newUser = new User({...createUserDto, id: this.nextId});
        this.users.push(newUser);
        this.nextId++;
        return new RespondUserDto(newUser);
    }

    async update(id: number, updateUserDto: UpdateUserDto): Promise<RespondUserDto> {
        const user = await this.findById(id);
        if (!user) {
            throw new NotFoundException(`User with id ${id} not found`);
        }
        Object.assign(user, updateUserDto);
         return new RespondUserDto(user);
    }

    async delete(id: number): Promise<boolean> {
        const user = await this.findById(id);
        if (!user) {
            throw new NotFoundException(`User with id ${id} not found`);
        }
        this.users = this.users.filter(user => user.id !== id);
        return true;
    }
}
