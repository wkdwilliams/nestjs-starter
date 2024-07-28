import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Seeder } from "nestjs-seeder";
import { DeepPartial, Repository } from "typeorm";
import { TimezoneEnum } from "../../components/enum/timezones.enum";
import { GetPasswordHash } from "../../components/utils/hashing";
import { User } from "./entities/user.entity";

@Injectable()
export class userSeeder implements Seeder {
    constructor(
        @InjectRepository(User) private repo: Repository<User>,
    ) {}

    async seed(): Promise<any> {
        const users: Array<DeepPartial<User>> = [
			{
				firstname: "Mon",
				lastname: "Pyae",
				username: "mon",
				password: await GetPasswordHash("pass"),
			}
		];

		await this.repo.save(users);
    }

    async drop(): Promise<any> {

    }
}