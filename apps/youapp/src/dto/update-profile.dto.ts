import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'The name of the user',
    type: String,
    example: 'John Doe',
  })
  readonly name?: string;
  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'The username of the user',
    type: String,
    example: 'johndoe',
  })
  readonly username?: string;
  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'The email of the user',
    type: String,
    example: 'johndoe@test.id',
  })
  readonly birthday?: string;
  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    description: 'The gender of the user',
    type: Boolean,
    example: true,
  })
  readonly gender?: boolean;
  @IsOptional()
  @IsNumber()
  @ApiProperty({
    description: 'The horoscope of the user',
    type: Number,
    example: 1,
  })
  readonly heightInCm?: string;
  @IsOptional()
  @IsNumber()
  @ApiProperty({
    description: 'The horoscope of the user',
    type: Number,
    example: 1,
  })
  readonly weightInKg?: number;
  @IsOptional()
  @IsArray()
  @ApiProperty({
    description: 'The interests of the user',
    type: [String],
    example: ['music', 'movies'],
  })
  readonly interests?: string[];
}
