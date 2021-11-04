import { hash } from './../../../utils/helper';
import {
  IsEmail,
  IsString,
  MinLength,
  Matches,
  MaxLength,
  IsNotEmpty,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UsersEntity } from 'src/model/users.entity';

export class SignupDto implements Readonly<SignupDto> {
  @ApiProperty({
    required: true,
    example: 'example@mail.com',
    description: 'user  email',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    required: true,
    example: 'password',
    description: 'user  password',
  })
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;

  @ApiProperty({
    required: true,
    example: 'John Doe',
    description: 'Name of the user',
  })
  @IsString()
  name: string;

  public static fromEntity(dto: Partial<SignupDto>): SignupDto {
    const users = new SignupDto();
    (users.name = dto.name), (users.email = dto.email);
    return users;
  }

  public async toEntity(): Promise<UsersEntity> {
    const users = new UsersEntity();
    users.name = this.name;
    users.email = this.email;
    users.password = await hash(this.password);
    return users;
  }
}
