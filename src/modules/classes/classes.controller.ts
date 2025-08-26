import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, Req, Render } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { ClassesService } from './classes.service';
import { ResponseFactory } from '../../common/dto/response.dto';
import { FilterClassesDto } from '../../common/dto/filter-classes.dto';
import { Role, Roles } from '../../common/decorators/roles.decorator';
import { RolesGuard } from '../../common/guards/role-based-guard';
import { SportsService } from '../sports/sports.service';
import { CreateClassDto } from '../../common/dto/create-class.dto';
import { UpdateClassDto } from '../../common/dto/update-class.dto';
import { Request } from 'express';


@ApiTags('classes')
@Controller('/classes')
@UseGuards(RolesGuard)
export class ClassesController {
  constructor(
    private readonly classesService: ClassesService,
    private readonly sportsService: SportsService
  ) { }

  // @Get()
  // @ApiOperation({ summary: 'Get all classes with optional filters' })
  // @ApiQuery({ name: 'sports', required: false, type: [String] })
  // @ApiQuery({ name: 'isActive', required: false, type: Boolean })
  // @ApiQuery({ name: 'activeDays', required: false, type: [String] })
  // async findByFilters(@Query() filters: FilterClassesDto) {
  //   const classes = await this.classesService.findByFilters(filters);
  //   return ResponseFactory.success(classes, 'Classes retrieved successfully');
  // }

  @Get()
  @Roles(Role.ADMIN)
  @Render('pages/admin-classes')
  async findAll() {
    const classes = await this.classesService.findAll();
    const sports = await this.sportsService.findAll();
    const activeClassesCount = classes.filter(cls => cls.is_active).length
    return {
      classes,
      sports,
      activeClassesCount
    }
  }

  @Get('my')
  @Render('pages/my-classes')
  async findMyClasses(@Req() request: Request) {
    const myClasses = await this.classesService.findUsersClasses(request.user.id);
    return {
      myClasses,
    }
  }

  @Get('all')
  @Render('pages/all-classes')
  async findAllJoinableClasses(@Req() request: Request) {
    let allClasses = await this.classesService.findAll();
    let classes = allClasses.map(cls => ({
      ...cls,
      isEnrolled: cls.userClasses?.some(uc => uc.user_id === request.user.id && !uc.left_at)
    }));
    const sports = await this.sportsService.findAll();
    const activeClassesCount = classes.filter(cls => cls.is_active).length
    const myEnrollmentsCount = classes.filter(cls => cls.userClasses.find(uc => uc.user_id === request.user.id)).length

    return {
      classes,
      sports,
      activeClassesCount,
      myEnrollmentsCount
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get class details by ID' })
  async findOne(@Param('id') id: string) {
    const classEntity = await this.classesService.findOne(id);
    return ResponseFactory.success(classEntity, 'Class details retrieved successfully');
  }

  @Post('/create')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Create a new class (Admin only)' })
  async create(@Body() createClassDto: CreateClassDto) {
    const newClass = await this.classesService.create(createClassDto);
    return ResponseFactory.success(newClass, 'Class created successfully');
  }

  @Post('/:id/edit')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Update a class (Admin only)' })
  async update(@Param('id') id: string, @Body() updateClassDto: UpdateClassDto) {
    const updatedClass = await this.classesService.update(id, updateClassDto);
    return ResponseFactory.success(updatedClass, 'Class updated successfully');
  }

  @Post(':id/delete')
  @ApiOperation({ summary: 'Delete a class (Admin only)' })
  async delete(@Param('id') id: string) {
    await this.classesService.delete(id);
    return ResponseFactory.success(null, 'Class deleted successfully');
  }

  @Post(':id/leave')
  @ApiOperation({ summary: 'Delete a class (Admin only)' })
  async leave(@Param('id') id: string, @Req() req: Request) {
    let newMyClasses = await this.classesService.leave(id, req.user.id);
    return ResponseFactory.success(newMyClasses, 'Class deleted successfully');
  }

  @Post(':id/join')
  @ApiOperation({ summary: 'Delete a class (Admin only)' })
  async join(@Param('id') id: string, @Req() req: Request) {
    let newMyClasses = await this.classesService.join(id, req.user.id);
    return ResponseFactory.success(newMyClasses, 'Class deleted successfully');
  }
}