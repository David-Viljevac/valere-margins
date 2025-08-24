import * as dotenv from 'dotenv';
dotenv.config()
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { JwtAuthGuard } from './common/guards/jwt-auth-guard';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  // Serve static files
  app.useStaticAssets(join(__dirname, '..', 'public'));

  const reflector = app.get(Reflector);
  app.useGlobalGuards(new JwtAuthGuard(reflector));

  // Set up express-handlebars
  const { engine } = require('express-handlebars');
  
  app.engine('hbs', engine({
    layoutsDir: join(__dirname, '..', 'views', 'layouts'),
    partialsDir: join(__dirname, '..', 'views', 'partials'),
    defaultLayout: 'main',
    extname: '.hbs'
  }));
  
  app.setViewEngine('hbs');
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  
  await app.listen(3000);
  console.log(`App running on http://localhost:3000`);
}
bootstrap();