import { ApiProperty } from '@nestjs/swagger';
import { 
  IsString, 
  IsNotEmpty, 
  IsUUID, 
  IsArray, 
  ArrayMinSize,
  IsEnum,
  Matches,
  IsOptional
} from 'class-validator';
import { DayOfWeek } from '../../database/entities/class.entity';

export class UpdateClassDto {
  @ApiProperty({ 
    example: '0198d6c7-eae2-7630-bbe8-87e325e63759',
    description: 'UUID of the sport' 
  })
  @IsUUID()
  @IsNotEmpty()
  sport_id: string;

  @ApiProperty({ 
    example: 'Morning Basketball Skills',
    description: 'Description of the class' 
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ 
    example: '14:00',
    description: 'Start time in HH:MM format' 
  })
  @IsString()
  @Matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: 'start_time must be in HH:MM format'
  })
  start_time: string;

  @ApiProperty({ 
    example: '15:30',
    description: 'End time in HH:MM format' 
  })
  @IsString()
  @Matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: 'end_time must be in HH:MM format'
  })
  end_time: string;

  @ApiProperty({
    example: ['Monday', 'Wednesday', 'Friday'],
    description: 'Days when the class is active',
    enum: DayOfWeek,
    isArray: true
  })
  @IsArray()
  @ArrayMinSize(1, { message: 'At least one active day must be selected' })
  @IsEnum(DayOfWeek, { each: true })
  active_days: DayOfWeek[];

  @ApiProperty({ 
    example: true,
    description: 'Whether the class is active',
    required: false,
    default: true 
  })
  @IsOptional()
  is_active?: boolean = true;
}