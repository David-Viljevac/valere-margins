import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MinLength, MaxLength, IsOptional } from 'class-validator';

export class UpdateSportDto {
  @ApiProperty({ 
    example: 'Basketball',
    description: 'Updated name of the sport',
    required: false,
    minLength: 2,
    maxLength: 50
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(2, { message: 'Sport name must be at least 2 characters long' })
  @MaxLength(50, { message: 'Sport name must not exceed 50 characters' })
  name?: string;
}