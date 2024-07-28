import { Restaurant } from "../entities/restaurant.entity";

export class RestaurantCreatedEvent {
    constructor (public restaurant: Restaurant) {}
}

export class RestaurantUpdatedEvent {
    constructor (public restaurant: Restaurant) {}
}