import { Catch, HttpException } from '@nestjs/common';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

@Catch()
export class CustomException extends HttpException {
    constructor(message: string | string[], statusCode: StatusCodes, error:ReasonPhrases | string) {
        super({
                message: Array.isArray(message) ? message : [message],
                error:   error,
            },
            statusCode,
        );
    }

    getMessage(){
        return this.message;
    }
}
