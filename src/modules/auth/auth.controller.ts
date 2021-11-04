import { JwtAuthGuard } from './../../guard/jwt-auth.guard';
import {
  Body,
  Controller,
  Post,
  UseGuards,
  ValidationPipe,
  Request,
  Get,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiResponse } from '@nestjs/swagger';
import { LocalAuthGuard } from 'src/guard/local-auth.guard';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { RequiredPermissions } from 'src/decorator/permission.decorator';
import { Permission } from 'src/enums/permission.enum';
import { Public } from 'src/decorator/public.decorator';

@Controller({ version: '1' })
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  @Public()
  login(@Request() req, @Body() loginDto: LoginDto) {
    console.log(req.user);
    const { userId } = req.user;

    // return req.user;
    return this.authService.login({ userId });
  }

  @Post('/signup')
  @Public()
  @ApiResponse({
    status: 201,
    description: 'User created successfully',
  })
  signup(@Body(new ValidationPipe({ transform: true })) signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  @RequiredPermissions(Permission.UPDATE_CAT, Permission.CREATE_CAT)
  getProfile(@Request() req) {
    return req.user;
  }
}
