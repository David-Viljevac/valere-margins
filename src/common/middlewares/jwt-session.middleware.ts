import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';

// Extend the Request interface to include user directly
declare global {
  namespace Express {
    interface Request {
      user?: any;
      token?: string;
      authInfo?: {
        user?: any;
        token?: string;
        isAuthenticated?: boolean;
      };
    }
  }
}

@Injectable()
export class JwtSessionMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies['access_token'];
    
    if (token) {
      try {
        const decoded = this.jwtService.verify(token, {
          secret: process.env.JWT_SECRET
        });
        req.user = decoded;
        req.token = token;
        req.authInfo = {
          user: decoded,
          token: token,
          isAuthenticated: true
        };
      } catch (error) {
        req.user = null;
        req.token = null;
        req.authInfo = {
          user: null,
          token: null,
          isAuthenticated: false
        };
      }
    } else {
      req.user = null;
      req.token = null;
      req.authInfo = {
        user: null,
        token: null,
        isAuthenticated: false
      };
    }

    next();
  }
}