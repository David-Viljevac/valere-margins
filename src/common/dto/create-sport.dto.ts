import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class CreateSportDto {
  @ApiProperty({ 
    example: 'Basketball',
    description: 'Name of the sport',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(2, { message: 'Sport name must be at least 2 characters long' })
  @MaxLength(50, { message: 'Sport name must not exceed 50 characters' })
  name: string;
}