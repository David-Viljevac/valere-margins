import { Injectable } from "@nestjs/common";
import { UsersRepository } from "./users.repository";
import { User } from "../../database/entities/user.entity";

@Injectable()
export class UsersService {
    constructor (
        private readonly usersRepository: UsersRepository
    ) {}

    async findAll(): Promise<User[]> {
        return this.usersRepository.findAll();
    }

    async login(userEmail: string, userPassword: string): Promise<User> {
        return this.usersRepository.login(userEmail, userPassword)
    }

    async register(userData: Partial<User>): Promise<User> {
        return this.usersRepository.register(userData)
    }
}