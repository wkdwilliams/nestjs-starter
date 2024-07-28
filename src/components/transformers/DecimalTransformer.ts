import { Logger } from '@nestjs/common';
import {ValueTransformer} from 'typeorm';

/**
 * Parses a decimal.
 * e.g. a value of 1.5 would return as 1.
 */

export class DecimalTransformer implements ValueTransformer {
    
    constructor(private defaultValue?: number) {}

    to(value?: number): number|null {
        if ((value === null || value === undefined) && this.defaultValue !== undefined) {
            return this.defaultValue;
        }

        return value;
    }

    from(value: string): number|null {
        if(value === null) return null;

        return parseFloat(value);
    }
}
