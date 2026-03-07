
import { Injectable } from "@nestjs/common";
import { User } from "./user.entity";

@Injectable()
export class UsersRepository {
    private users: User[] = [];
    
    async findAll(): Promise<User[]> {
        return this.users;
    }
}
