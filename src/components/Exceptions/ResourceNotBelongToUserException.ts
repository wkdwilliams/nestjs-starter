import { HttpException, Logger } from "@nestjs/common";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

export class ResourceNotBelongToUserException extends HttpException {
	constructor(message?: string) {
		super({
			message:    message && message !== null ? [message] : ['Resource does not belong to user'] ,
			error:      ReasonPhrases.FORBIDDEN,
		},
		StatusCodes.FORBIDDEN,
	);
		new Logger('ResourceNotBelongToUser').warn("The resource doesn\'t belong to you");
	}
}