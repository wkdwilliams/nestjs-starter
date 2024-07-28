import { UseInterceptors, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToInstance } from 'class-transformer';

interface ClassConstructor {
    new (...args: any[]): object;
}

export function Serialize(dto: ClassConstructor) {
    return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor {
    constructor(private dto: any) {}

    intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
        return handler.handle().pipe(
            map((data: any) => {
                if (data && data.items) {
                    return {
                        items: plainToInstance(this.dto, data.items, {
                            excludeExtraneousValues: true,
                            enableImplicitConversion: true,
                            strategy:'exposeAll'
                        }),
                        meta: data.meta,
                        links: data.links,
                    };
                } else {
                    return data ? {data: plainToInstance(this.dto, data, {
                        excludeExtraneousValues: true,
                        enableImplicitConversion: true
                    })} : null;
                }
            }),
        );
    }
}