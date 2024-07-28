import { Catch, HttpException } from '@nestjs/common';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
@Catch()
export class InvalidTokenException extends HttpException {
    constructor() {
        super({
            message:    ['Invalid Token.'] ,
            error:      ReasonPhrases.FORBIDDEN,
        },
        StatusCodes.FORBIDDEN,
     );
    }
}
