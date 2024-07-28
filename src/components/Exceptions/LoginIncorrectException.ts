import { Catch, HttpException } from '@nestjs/common';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
@Catch()
export class LoginIncorrectException extends HttpException {
    constructor() {
        super({
            message:    ['Login Invalid'] ,
            error:      ReasonPhrases.UNAUTHORIZED,
        },
        StatusCodes.UNAUTHORIZED,
     );
    }
}
