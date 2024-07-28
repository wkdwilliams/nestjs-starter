import { HttpException, HttpStatus } from "@nestjs/common";

export class ImATeaPotException extends HttpException {
	constructor() {
		super("I'm a teapot", HttpStatus.I_AM_A_TEAPOT);
	}
}