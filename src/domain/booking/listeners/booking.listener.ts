import { OnEvent } from "@nestjs/event-emitter";
import { BookingCreatedEvent, BookingUpdatedEvent } from "../event/booking.event";
import { Injectable } from "@nestjs/common";
import { BookingService } from '../booking.service';

@Injectable()
export class BookingListener {

    constructor(
        protected service: BookingService,
    ) {}
    
    @OnEvent('booking.created')
    async handleBookingCreatedEvent(event: BookingCreatedEvent) {
        // Code to run when booking has been created
    }

    @OnEvent('booking.updated')
    async handleTestUpdatedEvent(event: BookingUpdatedEvent) {
        // Code to run when booking has been updated
    }
}