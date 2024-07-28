import { IsString } from "class-validator";

export class CreateUserDto {
	@IsString()
	username: string;

	@IsString()
	password: string;

	@IsString()
	firstname: string;

	@IsString()
	lastname: string;
}
