import { Controller, Get, Post, Body, Patch, Param, Inject, Delete, Query } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { Controller as BaseController } from '../../components/abstract/controller';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { ResourceNotFoundExcepion } from '../../components/Exceptions/ResourceNotFoundExcepion';
import { ValidateIdPipe } from '../../components/pipes/ValidateId.pipe';
import { PaginationDto } from '../../components/dto/PaginationDto';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

@Controller('restaurant')
export class RestaurantController extends BaseController {
    constructor(
        @Inject(REQUEST)
        protected readonly request: Request,
        protected readonly service: RestaurantService,
    ) {
        super(request, service);
    }

    @Get("get-all")
    async findAllNoPagination() {
        const entitys = await this.service.findMany();

        for (let i = 0; i < entitys.length; i++) {
            entitys[i] = {
                ...entitys[i],
                ...{
                    is_open: await this.service.isOpenNow(entitys[i]),
                }
            };
        }

        return this.response(entitys);
    }

    @Get(':id')
    async findOne(@Param('id', ValidateIdPipe) id: number) {
        const entity = await this.service.findById(id);
        
        return this.response({
            ...entity,
            ...{
                is_open: await this.service.isOpenNow(entity),
            }
        });
    }

    @Get('is-open/:id')
    async isOpen(@Param('id', ValidateIdPipe) id: number) {
        const entity = await this.service.findById(id);
        
        const open = await this.service.isOpenNow(entity);
        
        return this.response({
            isOpen: open,
        });
    }

    @Get()
    async findAll(@Query() options: PaginationDto) {
        const entitys = await this.service.findAll(options);

        for (let i = 0; i < entitys.items.length; i++) {
            entitys.items[i] = {
                ...entitys.items[i],
                ...{
                    is_open: await this.service.isOpenNow(entitys.items[i]),
                }
            };
        }

        return entitys;
    }

    @Post()
    @ApiExcludeEndpoint()
    /**
     * ! Only delete this if you're going to use it
     */
    async create(@Body() createDto: CreateRestaurantDto) {
        throw new ResourceNotFoundExcepion();

        return super.create(createDto);
    }

    @Patch(':id')
    @ApiExcludeEndpoint()
    /**
     * ! Only delete this if you're going to use it
     */
    async update(@Param('id', ValidateIdPipe) id: number, @Body() updateDto: UpdateRestaurantDto) {
        throw new ResourceNotFoundExcepion();

        return super.update(id, updateDto)
    }

    @Delete(':id')
    @ApiExcludeEndpoint()
    /**
     * ! Only delete this if you're going to use it
     */
    async remove(@Param('id', ValidateIdPipe) id: number) {
        throw new ResourceNotFoundExcepion();

        return super.remove(id);
    }
}
