import { Controller, Get, Render, Req } from '@nestjs/common';
import { ClassesService } from '../classes/classes.service';
import { Public } from '../../common/decorators/public.decorator';
import { Request } from 'express';

@Controller()
export class AppController {
  constructor(private readonly classesService: ClassesService) {}

  @Public()
  @Get()
  @Render('pages/index')
  async getHomePage(@Req() request: Request) {
    let user;
    try {
      user = request.user;
      const classes = await this.classesService.findAll();

      return {
        title: 'Sports Complex Dashboard',
        classes: classes,
        hasClasses: classes.length > 0,
        user
      };
    } catch (error) {
      return {
        title: 'Sports Complex Dashboard',
        classes: [],
        hasClasses: false,
        error: 'Failed to load classes',
        user
      };
    }
  }
}
