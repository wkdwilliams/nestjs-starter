// ormconfig.ts
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

export const ormConfig: TypeOrmModuleOptions = {
    type: 'mysql',
    host: process.env.DATABASE_HOST,
    port: +process.env.DATABASE_PORT,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    synchronize: false,
    migrationsRun: false,
    autoLoadEntities: true,
    subscribers: [join(__dirname, 'src', 'domain', '**', 'subscribers', '*.subscriber.{ts,js}')],
    migrations: [join(__dirname, 'src', 'database', 'migrations', '*.{ts,js}')],
    migrationsTableName: 'typeorm_migrations',
    bigNumberStrings: false,
    logging: (process.env.TYPEORM_LOGGING == 'true') || false,
};