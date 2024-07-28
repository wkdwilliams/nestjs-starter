/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { EntitySubscriberInterface, EventSubscriber, InsertEvent, LoadEvent, UpdateEvent } from 'typeorm';
import { Restaurant } from '../entities/restaurant.entity';

@EventSubscriber()
export class RestaurantSubscriber implements EntitySubscriberInterface<Restaurant> {

    listenTo() {
        return Restaurant;
    }

    async afterLoad(entity: Restaurant, event?: LoadEvent<Restaurant>) {
        /**
         * Do something after the entity has been loaded
         */
    }

    async beforeInsert(event: InsertEvent<Restaurant>){
        /**
         * Do something before we create the entity
         */
    }

    async afterInsert(event: InsertEvent<Restaurant>) {
        /**
         * Do something after we have created the entity
         */
    }

    async beforeUpdate(event: UpdateEvent<Restaurant>) {
        /**
         * Do something before we update the entity
         */
    }

    async afterUpdate(event: UpdateEvent<Restaurant>) {
        /**
         * Do something after we have updated the entity
         */
    }
}
