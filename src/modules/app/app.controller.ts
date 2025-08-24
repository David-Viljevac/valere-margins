import { Controller, Get, Render } from '@nestjs/common';
import { ClassesService } from '../classes/classes.service';
import { Public } from '../../common/decorators/public.decorator';
import { request } from 'http';

@Controller()
export class AppController {
  constructor(private readonly classesService: ClassesService) {}

  @Public()
  @Get()
  @Render('pages/index')
  async getHomePage() {
    try {
      const classes = await this.classesService.findAll();

      return {
        title: 'Sports Complex Dashboard',
        classes: classes,
        hasClasses: classes.length > 0
      };
    } catch (error) {
      return {
        title: 'Sports Complex Dashboard',
        classes: [],
        hasClasses: false,
        error: 'Failed to load classes'
      };
    }
  }
}
