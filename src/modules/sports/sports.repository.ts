import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Sport } from '../../database/entities/sport.entity';
import { v7 } from 'uuid';

@Injectable()
export class SportsRepository {
  private sportRepository: Repository<Sport>;

  constructor(@Inject('DATA_SOURCE') private dataSource: DataSource) {
    this.sportRepository = this.dataSource.getRepository(Sport);
  }

  async findAll(): Promise<Sport[]> {
    return this.sportRepository.find();
  }

  async findOne(id: string): Promise<Sport> {
    return this.sportRepository.findOne({
      where: { id },
    });
  }

  async create(sportData: Partial<Sport>): Promise<Sport> {
    sportData.id = v7();
    const newSport = this.sportRepository.create(sportData);
    return this.sportRepository.save(newSport);
  }

  async update(id: string, sportData: Partial<Sport>): Promise<Sport> {
    await this.sportRepository.update(id, sportData);
    return this.findOne(id);
  }

  async delete(id: string): Promise<void> {
    await this.sportRepository.delete(id);
  }
}