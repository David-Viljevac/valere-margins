import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Class } from '../../database/entities/class.entity';
import { FilterClassesDto } from '../../common/dto/filter-classes.dto';
import { UserClass } from '../../database/entities/user-class.entity';

@Injectable()
export class ClassesRepository {
  private classRepository: Repository<Class>;
  private userClassRepository: Repository<UserClass>

  constructor(@Inject('DATA_SOURCE') private dataSource: DataSource) {
    this.classRepository = this.dataSource.getRepository(Class);
    this.userClassRepository = this.dataSource.getRepository(UserClass)
  }

  async findAll(): Promise<Class[]> {
    return this.classRepository.find({
      relations: ['sport', 'userClasses', 'userClasses.user'],
      order: { created_at: 'DESC' }
    });
  }

  async findUsersClasses(userId: string): Promise<any[]> {
    // First get user's classes
    const userClasses = await this.classRepository.query(`
        SELECT c.*, s.name as sport_name, s.id as sport_id, uc.joined_at, uc.left_at, array_to_json(c.active_days) as active_days
        FROM class c
        INNER JOIN user_class uc ON c.id = uc.class_id
        INNER JOIN sport s ON c.sport_id = s.id
        WHERE uc.user_id = $1 AND uc.left_at IS NULL
        ORDER BY c.created_at DESC
    `, [userId]);

    // Then get all users for each class
    const classIds = userClasses.map(cls => cls.id);

    if (classIds.length === 0) return [];

    const allUsersInClasses = await this.classRepository.query(`
        SELECT uc.class_id, u.id as user_id, u.first_name, u.last_name, u.email, uc.joined_at
        FROM user_class uc
        INNER JOIN "user" u ON uc.user_id = u.id
        WHERE uc.class_id = ANY($1) AND uc.left_at IS NULL
        ORDER BY u.first_name ASC
    `, [classIds]);

    // Combine the data
    return userClasses.map(cls => ({
      ...cls,
      allUsers: allUsersInClasses.filter(user => user.class_id === cls.id)
    }));
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

  async leave(id: string, userId: string): Promise<Class[]> {
    await this.userClassRepository.update(
      {
        class_id: id,
        user_id: userId,
      },
      {
        left_at: new Date(),
      }
    );
    return this.findUsersClasses(userId)
  }
}