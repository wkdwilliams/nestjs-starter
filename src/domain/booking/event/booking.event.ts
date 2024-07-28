import { Booking } from "../entities/booking.entity";

export class BookingCreatedEvent {
    constructor (public booking: Booking) {}
}

export class BookingUpdatedEvent {
    constructor (public booking: Booking) {}
}