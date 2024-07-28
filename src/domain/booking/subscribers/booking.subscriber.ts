/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { EntitySubscriberInterface, EventSubscriber, InsertEvent, LoadEvent, UpdateEvent } from 'typeorm';
import { ConvertDateStringToUTC } from '../../../components/utils/datetime';
import { Booking } from '../entities/booking.entity';

@EventSubscriber()
export class BookingSubscriber implements EntitySubscriberInterface<Booking> {

    listenTo() {
        return Booking;
    }

    async afterLoad(entity: Booking, event?: LoadEvent<Booking>) {
        
    }

    async beforeInsert(event: InsertEvent<Booking>){
        /**
         * Do something before we create the entity
         */
    }

    async afterInsert(event: InsertEvent<Booking>) {
        /**
         * Do something after we have created the entity
         */
    }

    async beforeUpdate(event: UpdateEvent<Booking>) {
        /**
         * Do something before we update the entity
         */
    }

    async afterUpdate(event: UpdateEvent<Booking>) {
        /**
         * Do something after we have updated the entity
         */
    }
}
