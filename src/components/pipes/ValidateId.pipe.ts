import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ValidateIdPipe implements PipeTransform<number> {
    transform(id: number): number {
        if (isNaN(id)) throw new BadRequestException('Invalid id sent');

        return id;
    }
}
