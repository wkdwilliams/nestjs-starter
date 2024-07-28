import { Injectable } from '@nestjs/common';
import { Service } from '../../components/abstract/service';
import { Restaurant } from './entities/restaurant.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, FindOptionsRelations, Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ServiceExtraValues, ServiceOnFailure } from '../../components/types/service-extra-values.type';
import { RestaurantCreatedEvent, RestaurantUpdatedEvent  } from './event/restaurant.event';
import { TimezoneEnum } from '../../components/enum/timezones.enum';
import moment from 'moment-timezone';
import { ConvertTimeToUTC } from '../../components/utils/datetime';

@Injectable()
export class RestaurantService extends Service<Restaurant> {

    protected loadRelations: FindOptionsRelations<Restaurant> = {
        booking: true
    };

    constructor(
        @InjectRepository(Restaurant)
        protected repository:   Repository<Restaurant>,
        protected eventEmitter: EventEmitter2
    ) {
        super(repository);
    }

    public async isOpenNow(restaurant: Restaurant): Promise<boolean> {
        const now = moment().tz(restaurant.timezone);

        // 0 = Sunday
        // 6 = Saturday
        const currentDay = now.day();

        if (!restaurant.opening_days.includes(currentDay)) {
            return false;
        }
        
        const opening = ConvertTimeToUTC(restaurant.open_from.toString(), restaurant.timezone);
        const closing = ConvertTimeToUTC(restaurant.open_to.toString(), restaurant.timezone);
        
        if (closing.isBefore(opening)) {
            closing.add(1, 'day');
            if (now.isBefore(opening)) {
                opening.subtract(1, 'day');
            }
        }

        return now.isBetween(opening, closing, null, '[)');
    }

    public async isOpenOnDates(restaurant: Restaurant, fromDateTimeString: string, toDatetimeString: string): Promise<boolean> {
        const fromDateTime  = moment.tz(fromDateTimeString, restaurant.timezone);
        const toDateTime    = moment.tz(toDatetimeString, restaurant.timezone);

        const openingFromDateTime   = moment.tz(fromDateTime.format('YYYY-MM-DD') + ' ' + restaurant.open_from, restaurant.timezone);
        const closingFromDateTime   = moment.tz(fromDateTime.format('YYYY-MM-DD') + ' ' + restaurant.open_to, restaurant.timezone);

        const isFromWithinOpenHours = fromDateTime.isBetween(openingFromDateTime, closingFromDateTime, null, '[)');
        const isToWithinOpenHours   = toDateTime.isBetween(openingFromDateTime, closingFromDateTime, null, '[)');

        return isFromWithinOpenHours && isToWithinOpenHours;
    }

    /**
     * Create a restaurant entity
     * @param create 
     * @param extraValues 
     * @param onFailure
     * @returns 
     */
    public async create(
        create:         DeepPartial<Restaurant>,
        extraValues?:   ServiceExtraValues,
        onFailure?:     ServiceOnFailure<Restaurant>
    ): Promise<Restaurant> {
        /**
         * Create the entity
         */
        const created = await super.create(create, null, onFailure)
        /**
         * Fire the restaurant created event
         */
        await this.eventEmitter.emitAsync('restaurant.created', new RestaurantCreatedEvent(created))

        return created;
    }

    /**
     * Update restaurant entity
     * @param id 
     * @param update 
     * @param extraValues 
     * @param onFailure 
     * @returns 
     */
    public async update(
        id:             number|Restaurant,
        update:         DeepPartial<Restaurant>,
        extraValues?:   ServiceExtraValues,
        onFailure?:     ServiceOnFailure<Restaurant>
    ): Promise<Restaurant> {
        /**
         * Update the entity
         */   
        const updated = await super.update(id, update, null, onFailure);
        /**
         * Fire the restaurant updated event
         */
        await this.eventEmitter.emitAsync('restaurant.created', new RestaurantUpdatedEvent(updated))

        return updated;
    }
}
