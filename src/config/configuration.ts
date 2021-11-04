import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { join } from 'path';

const environment = () => {
  const env = process.env.env;
  switch (env) {
    case 'development':
      return '.development.env';
    case 'production':
      return '.production.env';
    case 'test':
      return '.test.env';
    case 'local':
      return '.local.env';
  }
};

dotenv.config({ path: environment() });

const getEnvValue = (key) => {
  return process.env[key];
};

const config = () => ({
  encryptToken: getEnvValue('ENCRYPT_TOKEN'),
  getTypeOrmModuleOptions: (): TypeOrmModuleOptions => {
    return {
      type: 'postgres',

      host: getEnvValue('POSTGRES_HOST'),
      port: parseInt(getEnvValue('POSTGRES_PORT')),
      username: getEnvValue('POSTGRES_USER'),
      password: getEnvValue('POSTGRES_PASSWORD'),
      database: getEnvValue('POSTGRES_DATABASE'),
      autoLoadEntities: true,
      synchronize: true,

      entities: [join(`${__dirname}/../model/`, '**', '*.entity.{ts,js}')],

      migrationsTableName: 'migration',

      migrations: [join(`${__dirname}/src/migration/*.ts`)],

      cli: {
        migrationsDir: 'src/migration',
      },

      ssl: getEnvValue('POSTGRES_DATABASE') === 'production',
    };
  },
});

export default config;

export const configService = config();
