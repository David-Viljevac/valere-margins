import { Body, Controller, Get, Post, Query, Render, Res, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { UsersService } from "./users.service";
import { User } from "../../database/entities/user.entity";
import { ResponseFactory } from "../../common/dto/response.dto";
import { Response } from "express";
import { AuthService } from "../auth/auth.service";
import { Public } from "../../common/decorators/public.decorator";

@ApiTags('user')
@Controller('/users')
export class UsersController {
    constructor(private readonly authService: AuthService) {}

    // Serve login page
    @Public()
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
    @Public()
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
    @Public()
    @Post('login')
    async handleLogin(@Body() loginData: any, @Res() res: Response) {
        try {
            const user = await this.authService.validateUser(loginData.email, loginData.password);
            if (!user) {
                throw new Error('Invalid credentials');
            }

            const result = await this.authService.login(user);
            
            // Store JWT in cookie
            res.cookie('access_token', result.access_token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 24 * 60 * 60 * 1000,
            });

            res.redirect('/?success=Login successful');
        } catch (error) {
            res.redirect(`/users/login?error=${encodeURIComponent(error.message)}&email=${encodeURIComponent(loginData.email)}`);
        }
    }

    @Public()
    @Post('register')
    async handleRegister(@Body() userData: any, @Res() res: Response) {
         try {
            if (userData.password !== userData.confirm_password) {
                throw new Error("Passwords don't match");
            }
            const result = await this.authService.register(userData);
            
            // Store JWT in cookie
            res.cookie('access_token', result.access_token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 24 * 60 * 60 * 1000,
            });

            res.redirect('/?success=Account created successfully!');
        } catch (error) {
            const queryParams = new URLSearchParams({
                error: error.message,
                first_name: userData.first_name || '',
                last_name: userData.last_name || '',
                email: userData.email || '',
            });
            
            res.redirect(`/users/register?${queryParams.toString()}`);
        }
    }
}