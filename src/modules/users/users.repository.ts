import { Inject, Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { User } from "../../database/entities/user.entity";
import * as bcrypt from "bcrypt"
import { v7 } from "uuid";

@Injectable()
export class UsersRepository {
    private userRepository: Repository<User>

    constructor(@Inject('DATA_SOURCE') private dataSource: DataSource) {
        this.userRepository = this.dataSource.getRepository(User);
    }

    async findAll(): Promise<User[]>{
        return this.userRepository.find({
            order: {last_name: 'DESC'}
        })
    }

    async register(userData: any): Promise<User> {
        const saltRounds = 12;
        const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
        userData.encrypted_password = hashedPassword
        const userToCreate = new User({
            id: v7(),
            role_id: '0198d5d1-b2eb-7c86-a207-4bed26aeac18', //default member id
            ...userData,
            created_at: new Date(),
            edited_at: new Date(),
        });

        const newUser = this.userRepository.create(userToCreate);
        
        return this.userRepository.save(newUser);
    }

    async login(userEmail: string, userPassword: string): Promise<User> {
        const foundUser = await this.userRepository.findOne({
            where: {
                email: userEmail
            }
        });

        if (foundUser) {
            const isPasswordValid = await bcrypt.compare(userPassword, foundUser.encrypted_password);
            
            if (isPasswordValid) {
                return foundUser;
            } else {
                throw new Error('Invalid password');
            }
        } else {
            throw new Error('User not found');
        }
    }

    async findByEmail(userEmail: string): Promise<User> {
        const foundUser = await this.userRepository.findOne({
            where: { 
                email: userEmail
            },
            relations: ['role']
        })

        return foundUser
    }

    async findById(userId: string): Promise<User> {
        const foundUser = await this.userRepository.findOne({
            where:{
                id: userId
            },
            relations: ['role'],
        })

        return foundUser
    }
}

