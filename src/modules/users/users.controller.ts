import { Body, Controller, Get, Post, Query, Render, Res } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { UsersService } from "./users.service";
import { User } from "../../database/entities/user.entity";
import { ResponseFactory } from "../../common/dto/response.dto";
import { Response } from "express";

@ApiTags('user')
@Controller('/users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    // Serve login page
    @Get('login')
    @Render('pages/login')
    getLoginPage(
        @Query('error') error?: string,
        @Query('success') success?: string,
        @Query('email') email?: string
    ) {
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
    @Get('register')
    @Render('pages/register')
    getRegisterPage(
        @Query('error') error?: string,
        @Query('success') success?: string,
        @Query('first_name') firstName?: string,
        @Query('last_name') lastName?: string,
        @Query('email') email?: string,
    ) {
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
    @Post('login')
    async handleLogin(@Body() loginData: any, @Res() res: Response) {
        try {
            const user = await this.usersService.login(loginData.email, loginData.password);
            res.redirect('/?success=Login successful');
        } catch (error) {
            res.redirect(`/users/login?error=${encodeURIComponent(error.message)}&email=${encodeURIComponent(loginData.email)}`);
        }
    }

    @Post('register')
    async handleRegister(@Body() userData: any, @Res() res: Response) {
        try {
            if (userData.password !== userData.confirm_password) {
                throw new Error("Passwords don't match");
            }
            const user = await this.usersService.register(userData);
            
            res.redirect('/users/login?success=Account created successfully! Please log in.');
        } catch (error) {
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
    @Post('api/register')
    @ApiOperation({ summary: 'Register user' })
    async register(@Body() userData: User) {
        try {
            const user = await this.usersService.register(userData);
            return ResponseFactory.success(user, 'User registered successfully');
        } catch (error) {
            return ResponseFactory.error(error.message);
        }
    }

    @Post('api/login') // Changed to POST for security
    @ApiOperation({ summary: 'Login user' })
    async login(@Body() loginData: { email: string; password: string }) {
        try {
            const user = await this.usersService.login(loginData.email, loginData.password);
            return ResponseFactory.success(user, 'User logged in successfully');
        } catch (error) {
            return ResponseFactory.error('Invalid email or password');
        }
    }
}