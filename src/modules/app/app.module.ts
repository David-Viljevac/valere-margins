import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClassesController } from '../classes/classes.controller';
import { ClassesService } from '../classes/classes.service';
import { ClassesRepository } from '../classes/classes.repository';
import { DatabaseModule } from '../../database/database.module';
import { UsersController } from '../users/users.controller';
import { UsersRepository } from '../users/users.repository';
import { UsersService } from '../users/users.service';
import { AuthModule } from '../auth/auth.module';
import { JwtSessionMiddleware } from '../../common/middlewares/jwt-session.middleware';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [AppController, ClassesController, UsersController],
  providers: [AppService, ClassesService, ClassesRepository, UsersRepository, UsersService, JwtService],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtSessionMiddleware)
      .forRoutes('*');
  }
}
