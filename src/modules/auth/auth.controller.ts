import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';

@Controller({ version: '1' })
export class AuthController {
  @Post('/login')
  login(@Body() loginDto: LoginDto) {
    console.log(loginDto);
  }
}
