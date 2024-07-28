import { TypeOrmModule } from "@nestjs/typeorm";
import { seeder } from "nestjs-seeder";
import { join } from "path";
import * as dotenv from 'dotenv';
import { EventEmitterModule } from "@nestjs/event-emitter";
import { Booking } from "../domain/booking/entities/booking.entity";
import { Restaurant } from "../domain/restaurant/entities/restaurant.entity";
import { User } from "../domain/user/entities/user.entity";
import { BookingModule } from "../domain/booking/booking.module";
import { RestaurantModule } from "../domain/restaurant/restaurant.module";
import { UserModule } from "../domain/user/user.module";
import { RestaurantSeeder } from "../domain/restaurant/restaurant.seeder";
import { userSeeder } from "../domain/user/user.seeder";

dotenv.config();

seeder({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: process.env.DATABASE_HOST,
            port: +process.env.DATABASE_PORT,
            username: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
            synchronize: false,
            migrationsRun: false,
            autoLoadEntities: true,
            subscribers: [join(__dirname, 'src', 'domain', '**', 'subscribers', '*.subscriber.{ts,js}')],
            migrations: [join(__dirname, 'src', 'database', 'migrations', '*.{ts,js}')],
            migrationsTableName: 'typeorm_migrations',
            bigNumberStrings: false,
            dropSchema: false,
            logging: (process.env.TYPEORM_LOGGING == 'true') || false,
        }),
        TypeOrmModule.forFeature([
            Booking,
            Restaurant,
            User,
        ]),
        
        BookingModule,
        RestaurantModule,
        UserModule,
        EventEmitterModule.forRoot()
    ],
}).run([
    RestaurantSeeder,
    userSeeder,
]);
