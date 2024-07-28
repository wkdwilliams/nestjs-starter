import { Catch, HttpException } from '@nestjs/common';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
@Catch()
export class BadRequestException extends HttpException {
    constructor(message?: string) {
        super({
            message:    [message ?? 'Bad request'] ,
            error:      ReasonPhrases.BAD_REQUEST,
        },
        StatusCodes.BAD_REQUEST,
     );
    }
}
