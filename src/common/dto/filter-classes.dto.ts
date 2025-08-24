import { IsOptional, IsBoolean, IsArray, IsEnum } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { DayOfWeek } from '../../database/entities/class.entity';

export class FilterClassesDto {
  @ApiProperty({ required: false, type: [String] })
  @IsOptional()
  @IsArray()
  @Transform(({ value }) => Array.isArray(value) ? value : value?.split(','))
  sports?: string[];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  isActive?: boolean;

  @ApiProperty({ required: false, enum: DayOfWeek, isArray: true })
  @IsOptional()
  @IsArray()
  @IsEnum(DayOfWeek, { each: true })
  @Transform(({ value }) => Array.isArray(value) ? value : value?.split(','))
  activeDays?: DayOfWeek[];
}