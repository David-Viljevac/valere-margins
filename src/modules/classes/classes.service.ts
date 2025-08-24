import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { ClassesRepository } from './classes.repository';
// import { UserClassRepository } from '../user-class/user-class.repository';
// import { CreateClassDto } from './dto/create-class.dto';
// import { UpdateClassDto } from './dto/update-class.dto';
import { Class } from '../../database/entities/class.entity';
import { FilterClassesDto } from '../../common/dto/filter-classes.dto';

@Injectable()
export class ClassesService {
  constructor(
    private readonly classesRepository: ClassesRepository,
    // private readonly userClassRepository: UserClassRepository,
  ) {}

  async findAll(): Promise<Class[]> {
    return this.classesRepository.findAll();
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

//   async create(createClassDto: CreateClassDto): Promise<Class> {
//     return this.classesRepository.create(createClassDto);
//   }

//   async update(id: string, updateClassDto: UpdateClassDto): Promise<Class> {
//     const existingClass = await this.findOne(id);
//     return this.classesRepository.update(id, updateClassDto);
//   }

  async delete(id: string): Promise<void> {
    await this.findOne(id); // Check if exists
    await this.classesRepository.delete(id);
  }

//   async applyForClass(userId: string, classId: string): Promise<void> {
//     // Check if class exists
//     await this.findOne(classId);
    
//     // Check if user already applied
//     const existingApplication = await this.userClassRepository.findByUserAndClass(userId, classId);
//     if (existingApplication) {
//       throw new ConflictException('User already applied for this class');
//     }

//     await this.userClassRepository.create({ user_id: userId, class_id: classId });
//   }

  async getStats(): Promise<any> {
    return this.classesRepository.getStats();
  }
}