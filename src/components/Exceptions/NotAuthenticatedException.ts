import { Catch, HttpException } from '@nestjs/common';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
@Catch()
export class NotAuthenticatedException extends HttpException {
    constructor() {
        super({
            message:    ['Not Authenticated.'] ,
            error:      ReasonPhrases.FORBIDDEN,
        },
        StatusCodes.FORBIDDEN,
     );
    }
}
