import { Catch, HttpException } from '@nestjs/common';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

@Catch()
export class ResourceNotFoundExcepion extends HttpException {
    constructor(message?: string) {
        super({
                message:    message && message !== null ? [message] : ['Resource not found'] ,
                error:      ReasonPhrases.NOT_FOUND,
            },
            StatusCodes.NOT_FOUND,
        );
    }
}
