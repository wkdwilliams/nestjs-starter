import { Catch, HttpException } from '@nestjs/common';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

@Catch()
export class ValidationFailedException extends HttpException {
    constructor(message: string | string[]) {
        super({
                message:    Array.isArray(message) ? message : [message],
                error:      ReasonPhrases.BAD_REQUEST,
            },
            StatusCodes.BAD_REQUEST,
        );
    }

    getMessage(){
        return this.message;
    }
}
