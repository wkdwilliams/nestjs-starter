import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { BookingListener } from './listeners/booking.listener';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { RestaurantModule } from '../restaurant/restaurant.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Booking]),
        RestaurantModule,
    ],
    controllers: [
        BookingController,
    ],
    providers: [
        BookingService,
        BookingListener,
    ]
})
export class BookingModule {}
