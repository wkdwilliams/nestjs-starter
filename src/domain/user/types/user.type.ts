import { User } from "../entities/user.entity"

export type Authentication = {
	user: User;
	token: string;
}