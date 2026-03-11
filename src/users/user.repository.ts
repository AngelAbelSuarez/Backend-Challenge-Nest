import { Injectable, NotFoundException } from "@nestjs/common";
import { User } from "./entities/user.entity";
import { CreateUserDto, UpdateUserDto, RespondUserDto } from './dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class UsersRepository {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) { }



    async create(createUserDto: CreateUserDto): Promise<RespondUserDto> {
        const newUser = this.userRepository.create(createUserDto);
        // return new RespondUserDto(newUser);
        return await this.userRepository.save(newUser);
    }


    async findAll(): Promise<RespondUserDto[]> {
        const users = await this.userRepository.find();
        return users
    }

    async findById(id: string): Promise<RespondUserDto | undefined> {
        const user = await this.userRepository.findOneBy({ id });
        if (!user) {
            throw new NotFoundException(`User with id ${id} not found`);
        }
        // return new RespondUserDto(user);
        return user;
    }


    async update(id: string, updateUserDto: UpdateUserDto): Promise<RespondUserDto> {
        const user = await this.userRepository.findOneBy({ id });
        if (!user) {
            throw new NotFoundException(`User with id ${id} not found`);
        }
        await this.userRepository.update(id, updateUserDto);
        return user;
    }

    async delete(id: string): Promise<boolean> {
        const deleteResult = await this.userRepository.delete(id)
        if (deleteResult.affected === 0) {
            throw new NotFoundException(`User with id ${id} not found`);
        }
        return true;
    }

    /// falta implementar findByEmail
}
