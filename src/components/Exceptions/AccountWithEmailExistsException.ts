import { Catch, HttpException } from '@nestjs/common';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
@Catch()
export class AccountWithEmailExistsException extends HttpException {
    constructor() {
        super({
            message:    ['Account with that email already exists.'] ,
            error:      ReasonPhrases.BAD_REQUEST,
        },
        StatusCodes.BAD_REQUEST,
     );
    }
}
