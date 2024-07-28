import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Seeder } from "nestjs-seeder";
import { DeepPartial, Repository } from "typeorm";
import { TimezoneEnum } from "../../components/enum/timezones.enum";
import { Restaurant } from "./entities/restaurant.entity";

@Injectable()
export class RestaurantSeeder implements Seeder {
    constructor(
        @InjectRepository(Restaurant) private repo: Repository<Restaurant>,
    ) {}

    async seed(): Promise<any> {
        const restaurants: Array<DeepPartial<Restaurant>> = [
			{
				name: 				"Italian Restaurant",
				opening_days: 		[1,2,3,4,5,6,7],
				open_from: 			"19:00:00",
				open_to: 			"22:00:00",
				timezone: 			TimezoneEnum['Europe/Rome'],
				number_of_tables: 	10,
			},
			{
				name: 				"Chinese Restaurant",
				opening_days: 		[1,2,3,4,5,6,7],
				open_from: 			"17:00:00",
				open_to: 			"22:00:00",
				timezone: 			TimezoneEnum['Asia/Shanghai'],
				number_of_tables: 	15,
			},
			{
				name: 				"French Restaurant",
				opening_days: 		[1,2,3,4,5],
				open_from: 			"19:00:00",
				open_to: 			"22:00:00",
				timezone: 			TimezoneEnum['Europe/Paris'],
				number_of_tables: 	20,
			}
		];

		await this.repo.save(restaurants);
    }

    async drop(): Promise<any> {

    }
}