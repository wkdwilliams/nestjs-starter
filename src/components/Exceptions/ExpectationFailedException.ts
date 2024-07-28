import { Catch, HttpException } from '@nestjs/common';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
@Catch()
export class ExpectationFailedException extends HttpException {
    constructor() {
        super({
            message:    ['Expectation Failed.'] ,
            error:      ReasonPhrases.EXPECTATION_FAILED,
        },
        StatusCodes.EXPECTATION_FAILED,
     );
    }
}
