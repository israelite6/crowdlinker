import { hashMatch } from './../../utils/helper';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersRepository } from 'src/repository/users.repository';
import { SignupDto } from './dto/signup.dto';
import {
  ValidateUserInterface,
  LoggedInUserInterface,
} from './interfaces/user.validation.response.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async signup(signupDto: SignupDto) {
    const user = await this.usersRepository.insert(await signupDto.toEntity());

    const {
      identifiers: [{ id: userId }],
    } = user;

    return this.login({ userId });
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<LoggedInUserInterface> {
    const user = await this.usersRepository.findOne(
      { email },
      { select: ['password', 'id'] },
    );

    if (!user) {
      return null;
    }
    const { password: dbPassword, id: userId } = user;
    if (!(await hashMatch(password, dbPassword))) {
      return null;
    }
    return { userId };
  }

  login({ userId }: LoggedInUserInterface) {
    return {
      access_token: this.jwtService.sign({ userId }),
    };
  }
}
