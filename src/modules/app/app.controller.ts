import { Controller, Get, Render } from '@nestjs/common';
import { ClassesService } from '../classes/classes.service';

@Controller()
export class AppController {
  constructor(private readonly classesService: ClassesService) {}

  @Get()
  @Render('pages/index')
  async getHomePage() {
    try {
      const classes = await this.classesService.findAll();
      console.log(classes)
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
