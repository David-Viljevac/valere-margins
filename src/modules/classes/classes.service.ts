import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { ClassesRepository } from './classes.repository';
// import { UserClassRepository } from '../user-class/user-class.repository';
// import { CreateClassDto } from './dto/create-class.dto';
// import { UpdateClassDto } from './dto/update-class.dto';
import { Class } from '../../database/entities/class.entity';
import { FilterClassesDto } from '../../common/dto/filter-classes.dto';
import { CreateClassDto } from '../../common/dto/create-class.dto';
import { UpdateClassDto } from '../../common/dto/update-class.dto';

@Injectable()
export class ClassesService {
  constructor(
    private readonly classesRepository: ClassesRepository,
  ) { }

  async findAll(): Promise<Class[]> {
    return this.classesRepository.findAll();
  }

  async findUsersClasses(userId: string): Promise<Class[]> {
    return this.classesRepository.findUsersClasses(userId);
  }

  async findByFilters(filters: FilterClassesDto): Promise<Class[]> {
    return this.classesRepository.findByFilters(filters);
  }

  async findOne(id: string): Promise<Class> {
    const classEntity = await this.classesRepository.findOne(id);
    if (!classEntity) {
      throw new NotFoundException(`Class with ID ${id} not found`);
    }
    return classEntity;
  }

  async create(createClassDto: CreateClassDto): Promise<Class> {
    const classData: Partial<Class> = {
      sport_id: createClassDto.sport_id,
      description: createClassDto.description,
      start_time: createClassDto.start_time,
      end_time: createClassDto.end_time,
      active_days: createClassDto.active_days,
      created_at: new Date(),
      edited_at: new Date(),
      is_active: createClassDto.is_active ?? true, // Default to true if not provided
    };

    return this.classesRepository.create(classData);
  }

  async update(id: string, updateClassDto: UpdateClassDto): Promise<Class> {
    const classData: Partial<Class> = {
      sport_id: updateClassDto.sport_id,
      description: updateClassDto.description,
      start_time: updateClassDto.start_time,
      end_time: updateClassDto.end_time,
      active_days: updateClassDto.active_days,
      edited_at: new Date(),
      is_active: updateClassDto.is_active ?? true, // Default to true if not provided
    };

    return this.classesRepository.update(id, classData);
  }

  async delete(id: string): Promise<void> {
    await this.findOne(id); 
    await this.classesRepository.delete(id);
  }

  async leave(id: string, userId: string): Promise<Class[]> {
    return await this.classesRepository.leave(id, userId);
  }

  async join(id: string, userId: string): Promise<Class[]> {
    return await this.classesRepository.join(id, userId);
  }

}