import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class UserContextMiddleware implements NestMiddleware {
  use(req: Request & { user?: any }, res: Response & { locals?: any }, next: NextFunction) {
    if (!res.locals) {
      res.locals = {};
    }
    
    res.locals.user = req.user || null;
    res.locals.isAuthenticated = !!req.user;
    res.locals.isAdmin = req.user?.isAdmin || false;
    
    next();
  }
}