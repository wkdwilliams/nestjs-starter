import { Catch, HttpException } from '@nestjs/common';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
@Catch()
export class EmailErrorException extends HttpException {
    constructor() {
        super({
            message:    ['Error sending email.'] ,
            error:      ReasonPhrases.INTERNAL_SERVER_ERROR,
        },
        StatusCodes.INTERNAL_SERVER_ERROR,
     );
    }
}
