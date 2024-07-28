import { Catch, HttpException } from '@nestjs/common';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
@Catch()
export class InvalidFileUpload extends HttpException {
    constructor(error?: string) {
        super({
            message:    [error ? error : 'Unprocessable file'] ,
            error:      ReasonPhrases.UNPROCESSABLE_ENTITY,
        },
        StatusCodes.UNPROCESSABLE_ENTITY,
     );
    }
}