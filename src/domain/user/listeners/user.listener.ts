import { OnEvent } from "@nestjs/event-emitter";
import { UserCreatedEvent, UserUpdatedEvent } from "../event/user.event";
import { Injectable } from "@nestjs/common";
import { UserService } from '../user.service';

@Injectable()
export class UserListener {

    constructor(
        protected service: UserService,
    ) {}
    
    @OnEvent('user.created')
    async handleUserCreatedEvent(event: UserCreatedEvent) {
        // Code to run when user has been created
    }

    @OnEvent('user.updated')
    async handleTestUpdatedEvent(event: UserUpdatedEvent) {
        // Code to run when user has been updated
    }
}