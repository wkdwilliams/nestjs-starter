import { HttpStatus, ParseFilePipeBuilder } from '@nestjs/common';

export const parseImageFilePipe = new ParseFilePipeBuilder()
    .addFileTypeValidator({
        fileType: /(jpg|jpeg|png)$/,
    })
    .addMaxSizeValidator({
        maxSize: 1048576,
    })
    .build({
        errorHttpStatusCode: HttpStatus.UNSUPPORTED_MEDIA_TYPE,
    });

export const parseCsvFilePipe = new ParseFilePipeBuilder()
    .addFileTypeValidator({
        fileType: 'csv',
    })
    .addMaxSizeValidator({
        maxSize: 1048576,
    })
    .build({
        errorHttpStatusCode: HttpStatus.UNSUPPORTED_MEDIA_TYPE,
    });
