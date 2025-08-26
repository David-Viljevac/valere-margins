import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { SportsRepository } from './sports.repository';
import { Sport } from '../../database/entities/sport.entity';

@Injectable()
export class SportsService {
    constructor(
        private readonly sportsRepository: SportsRepository,
    ) { }

    async findAll(): Promise<Sport[]> {
        return this.sportsRepository.findAll();
    }

    async findOne(id: string): Promise<Sport> {
        const sportEntity = await this.sportsRepository.findOne(id);
        if (!sportEntity) {
            throw new NotFoundException(`Sport with ID ${id} not found`);
        }
        return sportEntity;
    }

    async update(id: string, sportData: Partial<Sport>): Promise<Sport> {
        const updatedSportEntity = await this.sportsRepository.update(id, sportData);
        return updatedSportEntity;
    }

    async create(sportData: Partial<Sport>): Promise<Sport> {
        const createdSportEntity = await this.sportsRepository.create(sportData);
        return createdSportEntity;
    }

    async delete(id: string): Promise<void> {
        await this.findOne(id);
        await this.sportsRepository.delete(id);
    }

}