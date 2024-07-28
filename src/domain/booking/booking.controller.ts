import { Controller, Get, Post, Body, Patch, Param, Inject, Delete, Query } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { Controller as BaseController } from '../../components/abstract/controller';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { ResourceNotFoundExcepion } from '../../components/Exceptions/ResourceNotFoundExcepion';
import { ValidateIdPipe } from '../../components/pipes/ValidateId.pipe';
import { PaginationDto } from '../../components/dto/PaginationDto';
import { ApiExcludeEndpoint } from '@nestjs/swagger';
import { RestaurantService } from '../restaurant/restaurant.service';

@Controller('booking')
export class BookingController extends BaseController {
    constructor(
        @Inject(REQUEST)
        protected readonly request: Request,
        protected readonly service: BookingService,
        protected readonly restaurantService: RestaurantService,
    ) {
        super(request, service);
    }

    @Get(':id')
    async findOne(@Param('id', ValidateIdPipe) id: number) {
        return super.findOne(id);
    }

    @Get()
    @ApiExcludeEndpoint()
    /**
     * ! Only delete this if you're going to use it
     */
    async findAll(@Query() options: PaginationDto) {
        throw new ResourceNotFoundExcepion();

        return super.findAll(options);
    }

    @Post()
    async create(@Body() createDto: CreateBookingDto) {
        return super.create({
            user_id: this.user.id,
            ...createDto
        });
    }

    @Patch(':id')
    @ApiExcludeEndpoint()
    /**
     * ! Only delete this if you're going to use it
     */
    async update(@Param('id', ValidateIdPipe) id: number, @Body() updateDto: UpdateBookingDto) {
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
