import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Class } from '../../database/entities/class.entity';
import { FilterClassesDto } from '../../common/dto/filter-classes.dto';

@Injectable()
export class ClassesRepository {
  private classRepository: Repository<Class>;

  constructor(@Inject('DATA_SOURCE') private dataSource: DataSource) {
    this.classRepository = this.dataSource.getRepository(Class);
  }

  async findAll(): Promise<Class[]> {
    return this.classRepository.find({
      relations: ['sport', 'userClasses', 'userClasses.user'],
      order: { created_at: 'DESC' }
    });
  }

  async findByFilters(filters: FilterClassesDto): Promise<Class[]> {
    const query = this.classRepository.createQueryBuilder('class')
      .leftJoinAndSelect('class.sport', 'sport')
      .leftJoinAndSelect('class.userClasses', 'userClasses')
      .leftJoinAndSelect('userClasses.user', 'user');

    if (filters.sports?.length) {
      query.andWhere('sport.name IN (:...sports)', { sports: filters.sports });
    }

    if (filters.isActive !== undefined) {
      query.andWhere('class.is_active = :isActive', { isActive: filters.isActive });
    }

    if (filters.activeDays?.length) {
      query.andWhere('class.active_days && :activeDays', { activeDays: filters.activeDays });
    }

    return query.orderBy('class.created_at', 'DESC').getMany();
  }

  async findOne(id: string): Promise<Class> {
    return this.classRepository.findOne({
      where: { id },
      relations: ['sport', 'userClasses', 'userClasses.user', 'userClasses.user.role'],
    });
  }

  async create(classData: Partial<Class>): Promise<Class> {
    const newClass = this.classRepository.create(classData);
    return this.classRepository.save(newClass);
  }

  async update(id: string, classData: Partial<Class>): Promise<Class> {
    await this.classRepository.update(id, classData);
    return this.findOne(id);
  }

  async delete(id: string): Promise<void> {
    await this.classRepository.delete(id);
  }
}