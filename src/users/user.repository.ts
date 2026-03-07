
import { Injectable, NotFoundException } from "@nestjs/common";
import { User } from "./user.entity";

@Injectable()
export class UsersRepository {
    private users: User[] = [];
    private nextId: number = 1;

    async findAll(): Promise<User[]> {
        return this.users;
    }

    async findById(id: number): Promise<User | undefined> {
        return this.users.find(user => user.id === id);
    }


    async create(createUser: Omit<User, 'id'>): Promise<User> {
        const newUser = new User({...createUser, id: this.nextId});
        this.users.push(newUser);
        this.nextId++;
        return newUser;
    }

    async update(id: number, updateUser: Partial<User>): Promise<User> {
        const user = await this.findById(id);
        if (!user) {
            throw new NotFoundException(`User with id ${id} not found`);
        }
        Object.assign(user, updateUser);
        return user;
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
