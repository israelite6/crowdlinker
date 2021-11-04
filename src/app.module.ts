import { PermissionGuard } from './guard/permission.guard';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import Config from './config/configuration';
import { APP_GUARD } from '@nestjs/core';

const config = Config();
@Module({
  imports: [
    ConfigModule.forRoot({ load: [Config] }),
    TypeOrmModule.forRoot(config.getTypeOrmModuleOptions()),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    {
      provide: APP_GUARD,
      useClass: PermissionGuard,
    },
    ConfigService,
  ],
})
export class AppModule {}
