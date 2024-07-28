import { Controller, Get, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import { Cache } from './components/cache/cache';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    public getHello(): string {
        return "Front page";
    }
}
