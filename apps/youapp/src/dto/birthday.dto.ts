import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class BirthdayDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'The birthday of the user',
    type: String,
    example: '2000-01-01',
  })
  readonly birthday!: string;
}
