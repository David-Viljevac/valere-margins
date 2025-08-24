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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const users_service_1 = require("./users.service");
const user_entity_1 = require("../../database/entities/user.entity");
const response_dto_1 = require("../../common/dto/response.dto");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    // Serve login page
    getLoginPage(error, success, email) {
        return {
            title: 'Login - Sports Complex',
            pageTitle: 'Welcome Back',
            layout: 'auth',
            error,
            success,
            email
        };
    }
    // Serve register page
    getRegisterPage(error, success, firstName, lastName, email) {
        return {
            title: 'Register - Sports Complex',
            pageTitle: 'Create Account',
            layout: 'auth',
            error,
            success,
            first_name: firstName,
            last_name: lastName,
            email,
        };
    }
    // Handle form submissions
    async handleLogin(loginData, res) {
        try {
            const user = await this.usersService.login(loginData.email, loginData.password);
            res.redirect('/?success=Login successful');
        }
        catch (error) {
            res.redirect(`/users/login?error=${encodeURIComponent(error.message)}&email=${encodeURIComponent(loginData.email)}`);
        }
    }
    async handleRegister(userData, res) {
        try {
            if (userData.password !== userData.confirm_password) {
                throw new Error("Passwords don't match");
            }
            const user = await this.usersService.register(userData);
            res.redirect('/users/login?success=Account created successfully! Please log in.');
        }
        catch (error) {
            const queryParams = new URLSearchParams({
                error: error.message,
                first_name: userData.first_name || '',
                last_name: userData.last_name || '',
                email: userData.email || '',
                phone_number: userData.phone_number || ''
            });
            res.redirect(`/users/register?${queryParams.toString()}`);
        }
    }
    // API endpoints
    async register(userData) {
        try {
            const user = await this.usersService.register(userData);
            return response_dto_1.ResponseFactory.success(user, 'User registered successfully');
        }
        catch (error) {
            return response_dto_1.ResponseFactory.error(error.message);
        }
    }
    async login(loginData) {
        try {
            const user = await this.usersService.login(loginData.email, loginData.password);
            return response_dto_1.ResponseFactory.success(user, 'User logged in successfully');
        }
        catch (error) {
            return response_dto_1.ResponseFactory.error('Invalid email or password');
        }
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Get)('login'),
    (0, common_1.Render)('pages/login'),
    __param(0, (0, common_1.Query)('error')),
    __param(1, (0, common_1.Query)('success')),
    __param(2, (0, common_1.Query)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getLoginPage", null);
__decorate([
    (0, common_1.Get)('register'),
    (0, common_1.Render)('pages/register'),
    __param(0, (0, common_1.Query)('error')),
    __param(1, (0, common_1.Query)('success')),
    __param(2, (0, common_1.Query)('first_name')),
    __param(3, (0, common_1.Query)('last_name')),
    __param(4, (0, common_1.Query)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getRegisterPage", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "handleLogin", null);
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "handleRegister", null);
__decorate([
    (0, common_1.Post)('api/register'),
    (0, swagger_1.ApiOperation)({ summary: 'Register user' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('api/login') // Changed to POST for security
    ,
    (0, swagger_1.ApiOperation)({ summary: 'Login user' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "login", null);
exports.UsersController = UsersController = __decorate([
    (0, swagger_1.ApiTags)('user'),
    (0, common_1.Controller)('/users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map