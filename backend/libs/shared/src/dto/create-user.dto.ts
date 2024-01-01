import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'The username of the new user',
    type: String,
    example: 'johndoe',
  })
  readonly username!: string;
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description: 'The email of the new user',
    type: String,
    example: 'johndoe@example.com',
  })
  readonly email!: string;
  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty({
    description: 'The password of new the user',
    type: String,
    example: '123456',
  })
  readonly password!: string;
}
