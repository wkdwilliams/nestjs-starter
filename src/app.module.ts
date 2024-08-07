import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { BullModule } from '@nestjs/bull';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsoleModule } from 'nestjs-console';
import { DataSource } from 'typeorm';
import { ormConfig } from '../ormconfig';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthMiddleware } from './components/Middleware/AuthMiddleware';
import { BookingModule } from './domain/booking/booking.module';
import { RestaurantModule } from './domain/restaurant/restaurant.module';
import { UserModule } from './domain/user/user.module';
import { UserService } from './domain/user/user.service';

@Module({
    imports: [
        EventEmitterModule.forRoot(),
        TypeOrmModule.forRoot(ormConfig),
        RestaurantModule,
        UserModule,
        BookingModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
    ],
})
export class AppModule {
    constructor(private dataSource: DataSource) {}
    
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AuthMiddleware).exclude(
            '/user/login',
            { path: '/user', method: RequestMethod.POST }
        ).forRoutes('/');
    }
}
