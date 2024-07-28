import { Module } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { RestaurantController } from './restaurant.controller';
import { RestaurantListener } from './listeners/restaurant.listener';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from './entities/restaurant.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Restaurant]),
    ],
    controllers: [
        RestaurantController,
    ],
    providers: [
        RestaurantService,
        RestaurantListener,
    ],
    exports: [
        RestaurantService,
    ],
})
export class RestaurantModule {}
