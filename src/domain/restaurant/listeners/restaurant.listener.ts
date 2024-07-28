import { OnEvent } from "@nestjs/event-emitter";
import { RestaurantCreatedEvent, RestaurantUpdatedEvent } from "../event/restaurant.event";
import { Injectable } from "@nestjs/common";
import { RestaurantService } from '../restaurant.service';

@Injectable()
export class RestaurantListener {

    constructor(
        protected service: RestaurantService,
    ) {}
    
    @OnEvent('restaurant.created')
    async handleRestaurantCreatedEvent(event: RestaurantCreatedEvent) {
        // Code to run when restaurant has been created
    }

    @OnEvent('restaurant.updated')
    async handleTestUpdatedEvent(event: RestaurantUpdatedEvent) {
        // Code to run when restaurant has been updated
    }
}