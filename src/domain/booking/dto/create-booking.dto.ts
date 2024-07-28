import { IsDateString, IsNumber } from "class-validator";

export class CreateBookingDto {
	@IsNumber()
	restaurant_id: number;

	@IsDateString()
	booking_from: string;

	@IsDateString()
	booking_to: string;

	@IsNumber()
	number_of_people: number;
}
