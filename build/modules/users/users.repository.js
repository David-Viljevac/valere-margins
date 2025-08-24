"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../database/entities/user.entity");
const bcrypt = require("bcrypt");
const uuid_1 = require("uuid");
let UsersRepository = class UsersRepository {
    constructor(dataSource) {
        this.dataSource = dataSource;
        this.userRepository = this.dataSource.getRepository(user_entity_1.User);
    }
    async findAll() {
        return this.userRepository.find({
            order: { last_name: 'DESC' }
        });
    }
    async register(userData) {
        const saltRounds = 12;
        const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
        userData.encrypted_password = hashedPassword;
        const userToCreate = new user_entity_1.User({
            id: (0, uuid_1.v7)(),
            role_id: '0198d5d1-b2eb-7c86-a207-4bed26aeac18',
            ...userData,
            created_at: new Date(),
            edited_at: new Date(),
        });
        const newUser = this.userRepository.create(userToCreate);
        return this.userRepository.save(newUser);
    }
    // async update(id: string, userData: Partial<User>): Promise<User> {
    //     await this.userRepository.update(id, userData);
    //     return this.userRepository.findOne(id)
    // }
    async login(userEmail, userPassword) {
        const foundUser = await this.userRepository.findOne({
            where: {
                email: userEmail
            }
        });
        if (foundUser) {
            const isPasswordValid = await bcrypt.compare(userPassword, foundUser.encrypted_password);
            if (isPasswordValid) {
                return foundUser;
            }
            else {
                throw new Error('Invalid password');
            }
        }
        else {
            throw new Error('User not found');
        }
    }
};
exports.UsersRepository = UsersRepository;
exports.UsersRepository = UsersRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('DATA_SOURCE')),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], UsersRepository);
//# sourceMappingURL=users.repository.js.map