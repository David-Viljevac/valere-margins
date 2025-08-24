import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { ClassesService } from './classes.service';
// import { CreateClassDto } from './dto/create-class.dto';
// import { UpdateClassDto } from './dto/update-class.dto';
// import { FilterClassesDto } from './dto/filter-classes.dto';
import { ResponseFactory } from '../../common/dto/response.dto';
import { FilterClassesDto } from '../../common/dto/filter-classes.dto';
// import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
// import { RolesGuard } from '../../common/guards/roles.guard';
// import { Roles } from '../../common/decorators/roles.decorator';
// import { Public } from '../../common/decorators/public.decorator';

@ApiTags('classes')
@Controller('/classes')
// @UseGuards(JwtAuthGuard, RolesGuard)
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}

  @Get()
//   @Public()
  @ApiOperation({ summary: 'Get all classes with optional filters' })
  @ApiQuery({ name: 'sports', required: false, type: [String] })
  @ApiQuery({ name: 'isActive', required: false, type: Boolean })
  @ApiQuery({ name: 'activeDays', required: false, type: [String] })
  async findByFilters(@Query() filters: FilterClassesDto) {
    const classes = await this.classesService.findByFilters(filters);
    return ResponseFactory.success(classes, 'Classes retrieved successfully');
  }

@Get()
// @Public()
@ApiOperation({ summary: 'Get all classes' })
async findAll() {
    const classes = await this.classesService.findAll();
    return ResponseFactory.success(classes, 'Classes retrieved successfully');
}

  @Get('stats')
//   @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get classes statistics (Admin only)' })
  async getStats() {
    const stats = await this.classesService.getStats();
    return ResponseFactory.success(stats, 'Statistics retrieved successfully');
  }

  @Get(':id')
//   @Public()
  @ApiOperation({ summary: 'Get class details by ID' })
  async findOne(@Param('id') id: string) {
    const classEntity = await this.classesService.findOne(id);
    return ResponseFactory.success(classEntity, 'Class details retrieved successfully');
  }

//   @Post()
//   @Roles('admin')
//   @ApiBearerAuth()
//   @ApiOperation({ summary: 'Create a new class (Admin only)' })
//   async create(@Body() createClassDto: CreateClassDto) {
//     const newClass = await this.classesService.create(createClassDto);
//     return ResponseFactory.success(newClass, 'Class created successfully');
//   }

//   @Put(':id')
//   @Roles('admin')
//   @ApiBearerAuth()
//   @ApiOperation({ summary: 'Update a class (Admin only)' })
//   async update(@Param('id') id: string, @Body() updateClassDto: UpdateClassDto) {
//     const updatedClass = await this.classesService.update(id, updateClassDto);
//     return ResponseFactory.success(updatedClass, 'Class updated successfully');
//   }

  @Delete(':id')
//   @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a class (Admin only)' })
  async delete(@Param('id') id: string) {
    await this.classesService.delete(id);
    return ResponseFactory.success(null, 'Class deleted successfully');
  }

//   @Post(':id/apply')
//   @ApiBearerAuth()
//   @ApiOperation({ summary: 'Apply for a class' })
//   async applyForClass(@Param('id') id: string, @Req() req) {
//     await this.classesService.applyForClass(req.user.id, id);
//     return ResponseFactory.success(null, 'Successfully applied for class');
//   }
}