import { Injectable } from '@nestjs/common';
import { Service } from '../../components/abstract/service';
import { Booking } from './entities/booking.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, FindOptionsRelations, Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ServiceExtraValues, ServiceOnFailure } from '../../components/types/service-extra-values.type';
import { BookingCreatedEvent, BookingUpdatedEvent  } from './event/booking.event';
import { RestaurantService } from '../restaurant/restaurant.service';
import { ConvertDateStringToUTC, ConvertTimeToUTC } from '../../components/utils/datetime';
import { TimezoneEnum } from '../../components/enum/timezones.enum';
import { BadRequestException } from '../../components/Exceptions/BadRequestException';
import { Restaurant } from '../restaurant/entities/restaurant.entity';

@Injectable()
export class BookingService extends Service<Booking> {

    protected loadRelations: FindOptionsRelations<Booking> = {
        restaurant: true,
        user: true,
    };

    constructor(
        @InjectRepository(Booking)
        protected repository:   Repository<Booking>,
        protected eventEmitter: EventEmitter2,
        protected restaurantService: RestaurantService
    ) {
        super(repository);
    }

    public async bookingIsFull(restaurant: Restaurant, bookingFrom: string, bookingTo: string): Promise<boolean> {
        const q = await this.repository.manager.query<any[]>(
            `SELECT * FROM booking WHERE restaurant_id=? AND (
                (booking_from BETWEEN ? AND ?)
                OR
                (booking_to BETWEEN ? AND ?)
                OR
                (? BETWEEN booking_from AND booking_to)
                OR
                (? BETWEEN booking_from AND booking_to)
            );`,
            [restaurant.id, bookingFrom, bookingTo, bookingFrom, bookingTo, bookingFrom, bookingTo, bookingFrom, bookingTo]
        );

        return q.length == restaurant.number_of_tables;
    }

    /**
     * Create a booking entity
     * @param create 
     * @param extraValues 
     * @param onFailure
     * @returns 
     */
    public async create(
        create:         DeepPartial<Booking>,
        extraValues?:   ServiceExtraValues,
        onFailure?:     ServiceOnFailure<Booking>
    ): Promise<Booking> {
        const restaurant = await this.restaurantService.findById(create.restaurant_id);

        // Check if restaurant is open and has no other booking
        if(!await this.restaurantService.isOpenOnDates(restaurant, create.booking_from as string, create.booking_to as string)) {
            throw new BadRequestException("Restaurant is closed");
        }

        if(await this.bookingIsFull(restaurant, create.booking_from as string, create.booking_to as string)) {
            throw new BadRequestException("Restaurant already has reservations for this date and time");
        }
        
        /**
         * Create the entity
         */
        const created = await super.create(create, null, onFailure)
        /**
         * Fire the booking created event
         */
        await this.eventEmitter.emitAsync('booking.created', new BookingCreatedEvent(created))

        return created;
    }

    /**
     * Update booking entity
     * @param id 
     * @param update 
     * @param extraValues 
     * @param onFailure 
     * @returns 
     */
    public async update(
        id:             number|Booking,
        update:         DeepPartial<Booking>,
        extraValues?:   ServiceExtraValues,
        onFailure?:     ServiceOnFailure<Booking>
    ): Promise<Booking> {
        /**
         * Update the entity
         */   
        const updated = await super.update(id, update, null, onFailure);
        /**
         * Fire the booking updated event
         */
        await this.eventEmitter.emitAsync('booking.created', new BookingUpdatedEvent(updated))

        return updated;
    }
}
