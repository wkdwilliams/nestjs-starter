import {ValueTransformer} from 'typeorm';

/**
 * Convert true & false to 0 & 1, and vice versa.
 * e.g. a value of 1 coming from a column would be
 * converted to true. A value of true inserting to
 * the column would be converted to 1.
 */
export class BoolBitTransformer implements ValueTransformer {
    
    constructor(private defaultValue?: boolean) {}

    to(value: boolean | null): number | null {
        if ((value === null || value === undefined) && this.defaultValue !== undefined)
            return +this.defaultValue;
        if (value === null || value === undefined)
            return null;
        
        return +value;
    }

    from(value?: string | Buffer | null): boolean | null {
        if (value === null)
            return null;
        
        if (typeof value === "object")
            return Boolean(Number(value[0]));

        return Boolean(Number(value));
    }
}
