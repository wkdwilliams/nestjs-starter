import { ClassSerializerInterceptor, Delete, Get, Param, Query, UseInterceptors } from '@nestjs/common';
import { Service } from './service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { IEntityResponse, IEntitysResponse } from '../Interface/response.interface';
import { Pagination } from 'nestjs-typeorm-paginate';
import { PaginationDto } from '../dto/PaginationDto';
import { ValidateIdPipe } from '../pipes/ValidateId.pipe';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@ApiBearerAuth()
@UseInterceptors(ClassSerializerInterceptor)
export abstract class Controller {
    // Store the full URL
    protected url: string;

    // Store only the route
    protected route: string;

    protected user?: {id: number};

    constructor(protected readonly request: Request, protected service: Service<any>) {
        this.url =
            this.request.protocol + '://' + this.request.get('host') + this.request.originalUrl;
        this.route = this.request.originalUrl;

        if (this.request.headers.hasOwnProperty('authorization')) {
            const token   = this.request.headers.authorization.split('Bearer ')[1];
            const decoded = new JwtService().decode(token, { json: true });

            this.user = {
                id: Number(decoded['id']),
            }
        }
    }

    /**
     * Find all and paginate the result
     */
    @Get()
    async findAll(@Query() options: PaginationDto): Promise<Pagination<any> | IEntityResponse | IEntitysResponse> {
        // They are undefined if calling from Jest for some reason... so must set them.
        if (options.page  === undefined) options.page = 1;
        if (options.limit === undefined) options.limit = 10;
        
        const data = await this.service.findAll({
            page:  options.page,
            limit: options.limit,
            route: this.url,
        }, {
            order: {
                [(options as any).orderby]: (options as any).sort_id,
            },
        });

        return data;
    }

    /**
     *
     * @param id
     * @returns
     */
    @Get(':id')
    async findOne(@Param('id', ValidateIdPipe) id: number): Promise<IEntityResponse | IEntitysResponse> {
        const data = await this.service.findById(id);

        return this.response(data);
    }

    /**
     *
     * @param createDto
     * @returns
     */
    async create(createDto: any): Promise<IEntityResponse | IEntitysResponse> {
        const data = await this.service.create(createDto);

        return this.response(data);
    }

    /**
     *
     * @param id
     * @param updateDto
     * @returns
     */
    async update(id: number, updateDto: any): Promise<IEntityResponse | IEntitysResponse> {
        const data = await this.service.update(+id, updateDto);

        return this.response(data);
    }

    /**
     *
     * @param id
     * @returns
     */
    @Delete(':id')
    async remove(@Param('id', ValidateIdPipe) id: number): Promise<IEntityResponse | IEntitysResponse> {
        const data = await this.service.remove(+id);

        return this.response(data);
    }

    /**
     *
     * @param data
     * @returns
     */
    protected response(data: unknown|unknown[]): { data: unknown } | { items: unknown[] } {
        if (Array.isArray(data))
            return {
                items: data
            }

        return {
            data: data,
        };
    }
}
