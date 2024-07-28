/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { EntitySubscriberInterface, EventSubscriber, InsertEvent, LoadEvent, UpdateEvent } from 'typeorm';
import { User } from '../entities/user.entity';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {

    listenTo() {
        return User;
    }

    async afterLoad(entity: User, event?: LoadEvent<User>) {
        /**
         * Do something after the entity has been loaded
         */
    }

    async beforeInsert(event: InsertEvent<User>){
        /**
         * Do something before we create the entity
         */
    }

    async afterInsert(event: InsertEvent<User>) {
        /**
         * Do something after we have created the entity
         */
    }

    async beforeUpdate(event: UpdateEvent<User>) {
        /**
         * Do something before we update the entity
         */
    }

    async afterUpdate(event: UpdateEvent<User>) {
        /**
         * Do something after we have updated the entity
         */
    }
}
