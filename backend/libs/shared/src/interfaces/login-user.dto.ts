import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'The username or email of the user',
    type: String,
    example: 'johndoe',
  })
  readonly usernameOrEmail!: string;
  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty({
    description: 'The password of the user',
    type: String,
    example: '123456',
  })
  readonly password!: string;
}
