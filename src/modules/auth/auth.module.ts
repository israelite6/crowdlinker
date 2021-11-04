import { JWT_EXPIRATION } from './../../config/constant';
import { configService } from './../../config/configuration';
import { JwtStrategy } from './jwt.strategy';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from './../../repository/users.repository';
import { LocalStrategyService } from './local.strategy.services';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersRepository]),
    JwtModule.register({
      secret: configService.encryptToken,
      signOptions: { expiresIn: JWT_EXPIRATION },
    }),
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategyService, JwtStrategy],
})
export class AuthModule {}
