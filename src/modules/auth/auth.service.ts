import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

export interface JwtPayload {
  user_id: string; 
  email: string;
  role_id: string;
  isAdmin;
  iat?: number;
  exp?: number;
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    try {
      const user = await this.usersService.findByEmail(email);
      
      if (user && await bcrypt.compare(password, user.encrypted_password)) {
        const { encrypted_password, ...result } = user;
        return result;
      }
      return null;
    } catch (error) {
      return null;
    }
  }

  async login(user: any) {
    const userFromDb = await this.usersService.findById(user.id)
    const payload: JwtPayload = {
      user_id: user.id,
      email: user.email,
      role_id: user.role_id,
      isAdmin: userFromDb.role.name === 'Admin'
    };

    const accessToken = this.jwtService.sign(payload);
    
    return {
      access_token: accessToken,
      user: {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        role_id: user.role_id,
      },
      expires_in: '24h',
    };
  }

  async register(userData: any) {
    const user = await this.usersService.register(userData);
    return this.login(user);
  }

  async validateJwtPayload(payload: JwtPayload): Promise<any> {
    const user = await this.usersService.findById(payload.user_id);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}