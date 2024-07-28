import { Catch, HttpException } from '@nestjs/common';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
@Catch()
export class UnprocessableEntityException extends HttpException {
    constructor(message?: string) {
        super({
            message:    [message ?? 'Unprocessable Entity'] ,
            error:      ReasonPhrases.UNPROCESSABLE_ENTITY,
        },
        StatusCodes.UNPROCESSABLE_ENTITY,
     );
    }
}
