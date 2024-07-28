async function go() {

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});
const fs = require('fs');
const path = require('path');

function replaceAll(search, replace, string) {
    return string.split(search).join(replace);
}

function camelize(str) {
    var words = str.split('_');
    var upperCamelCase = '';
  
    for (var i = 0; i < words.length; i++) {
      var capitalizedWord = words[i].charAt(0).toUpperCase() + words[i].slice(1);
      upperCamelCase += capitalizedWord;
    }
  
    return upperCamelCase;
}

let entityTemplate = `import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name:     '#########################',
    database: 'database_name',
})
export class @@@@@@@@@@@@@@@@@@@@@@ {
    @PrimaryGeneratedColumn('increment', { type: 'bigint' })
    id: number;
}
`;

let controllerTemplate = `import { Controller, Get, Post, Body, Patch, Param, Inject, Delete, Query } from '@nestjs/common';
import { @@@@@@@@@@@@@@@@@@@@@@Service } from './#########################.service';
import { Create@@@@@@@@@@@@@@@@@@@@@@Dto } from './dto/create-#########################.dto';
import { Update@@@@@@@@@@@@@@@@@@@@@@Dto } from './dto/update-#########################.dto';
import { Controller as BaseController } from '../components/abstract/controller';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { ResourceNotFoundExcepion } from '../components/Exceptions/ResourceNotFoundExcepion';
import { ValidateIdPipe } from '../components/pipes/ValidateId.pipe';
import { PaginationDto } from '../components/dto/PaginationDto';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

@Controller('#########################')
export class @@@@@@@@@@@@@@@@@@@@@@Controller extends BaseController {
    constructor(
        @Inject(REQUEST)
        protected readonly request: Request,
        protected readonly service: @@@@@@@@@@@@@@@@@@@@@@Service,
    ) {
        super(request, service);
    }

    @Get(':id')
    @ApiExcludeEndpoint()
    /**
     * ! Only delete this if you're going to use it
     */
    async findOne(@Param('id', ValidateIdPipe) id: number) {
        throw new ResourceNotFoundExcepion();

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
    @ApiExcludeEndpoint()
    /**
     * ! Only delete this if you're going to use it
     */
    async create(@Body() createDto: Create@@@@@@@@@@@@@@@@@@@@@@Dto) {
        throw new ResourceNotFoundExcepion();

        return super.create(createDto);
    }

    @Patch(':id')
    @ApiExcludeEndpoint()
    /**
     * ! Only delete this if you're going to use it
     */
    async update(@Param('id', ValidateIdPipe) id: number, @Body() updateDto: Update@@@@@@@@@@@@@@@@@@@@@@Dto) {
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
`;

let serviceTemplate = `import { Injectable } from '@nestjs/common';
import { Service } from '../components/abstract/service';
import { @@@@@@@@@@@@@@@@@@@@@@ } from './entities/#########################.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ServiceExtraValues, ServiceOnFailure } from '../components/types/service-extra-values.type';
import { @@@@@@@@@@@@@@@@@@@@@@CreatedEvent, @@@@@@@@@@@@@@@@@@@@@@UpdatedEvent  } from './event/#########################.event';

@Injectable()
export class @@@@@@@@@@@@@@@@@@@@@@Service extends Service<@@@@@@@@@@@@@@@@@@@@@@> {
    constructor(
        @InjectRepository(@@@@@@@@@@@@@@@@@@@@@@)
        protected repository:   Repository<@@@@@@@@@@@@@@@@@@@@@@>,
        protected eventEmitter: EventEmitter2
    ) {
        super(repository);
    }

    /**
     * Create a ######################### entity
     * @param create 
     * @param extraValues 
     * @param onFailure
     * @returns 
     */
    public async create(
        create:         DeepPartial<@@@@@@@@@@@@@@@@@@@@@@>,
        extraValues?:   ServiceExtraValues,
        onFailure?:     ServiceOnFailure<@@@@@@@@@@@@@@@@@@@@@@>
    ): Promise<@@@@@@@@@@@@@@@@@@@@@@> {
        /**
         * Create the entity
         */
        const created = await super.create(create, null, onFailure)
        /**
         * Fire the ######################### created event
         */
        await this.eventEmitter.emitAsync('#########################.created', new @@@@@@@@@@@@@@@@@@@@@@CreatedEvent(created))

        return created;
    }

    /**
     * Update ######################### entity
     * @param id 
     * @param update 
     * @param extraValues 
     * @param onFailure 
     * @returns 
     */
    public async update(
        id:             number|@@@@@@@@@@@@@@@@@@@@@@,
        update:         DeepPartial<@@@@@@@@@@@@@@@@@@@@@@>,
        extraValues?:   ServiceExtraValues,
        onFailure?:     ServiceOnFailure<@@@@@@@@@@@@@@@@@@@@@@>
    ): Promise<@@@@@@@@@@@@@@@@@@@@@@> {
        /**
         * Update the entity
         */   
        const updated = await super.update(id, update, null, onFailure);
        /**
         * Fire the ######################### updated event
         */
        await this.eventEmitter.emitAsync('#########################.created', new @@@@@@@@@@@@@@@@@@@@@@UpdatedEvent(updated))

        return updated;
    }
}
`

let moduleTemplate = `import { Module } from '@nestjs/common';
import { @@@@@@@@@@@@@@@@@@@@@@Service } from './#########################.service';
import { @@@@@@@@@@@@@@@@@@@@@@Controller } from './#########################.controller';
import { @@@@@@@@@@@@@@@@@@@@@@Listener } from './listeners/#########################.listener';
import { TypeOrmModule } from '@nestjs/typeorm';
import { @@@@@@@@@@@@@@@@@@@@@@ } from './entities/#########################.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([@@@@@@@@@@@@@@@@@@@@@@]),
    ],
    controllers: [
        @@@@@@@@@@@@@@@@@@@@@@Controller,
    ],
    providers: [
        @@@@@@@@@@@@@@@@@@@@@@Service,
        @@@@@@@@@@@@@@@@@@@@@@Listener,
    ]
})
export class @@@@@@@@@@@@@@@@@@@@@@Module {}
`

let updateDtoTemplate = `import { PartialType } from '@nestjs/swagger';
import { Create@@@@@@@@@@@@@@@@@@@@@@Dto } from './create-#########################.dto';

export class Update@@@@@@@@@@@@@@@@@@@@@@Dto extends PartialType(Create@@@@@@@@@@@@@@@@@@@@@@Dto) {}
`

let createDtoTemplate = `export class Create@@@@@@@@@@@@@@@@@@@@@@Dto {}
`;

let subscriberTemplate = `/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { EntitySubscriberInterface, EventSubscriber, InsertEvent, LoadEvent, UpdateEvent } from 'typeorm';
import { @@@@@@@@@@@@@@@@@@@@@@ } from '../entities/#########################.entity';

@EventSubscriber()
export class @@@@@@@@@@@@@@@@@@@@@@Subscriber implements EntitySubscriberInterface<@@@@@@@@@@@@@@@@@@@@@@> {

    listenTo() {
        return @@@@@@@@@@@@@@@@@@@@@@;
    }

    async afterLoad(entity: @@@@@@@@@@@@@@@@@@@@@@, event?: LoadEvent<@@@@@@@@@@@@@@@@@@@@@@>) {
        /**
         * Do something after the entity has been loaded
         */
    }

    async beforeInsert(event: InsertEvent<@@@@@@@@@@@@@@@@@@@@@@>){
        /**
         * Do something before we create the entity
         */
    }

    async afterInsert(event: InsertEvent<@@@@@@@@@@@@@@@@@@@@@@>) {
        /**
         * Do something after we have created the entity
         */
    }

    async beforeUpdate(event: UpdateEvent<@@@@@@@@@@@@@@@@@@@@@@>) {
        /**
         * Do something before we update the entity
         */
    }

    async afterUpdate(event: UpdateEvent<@@@@@@@@@@@@@@@@@@@@@@>) {
        /**
         * Do something after we have updated the entity
         */
    }
}
`;

let listenerTemplate = `import { OnEvent } from "@nestjs/event-emitter";
import { @@@@@@@@@@@@@@@@@@@@@@CreatedEvent, @@@@@@@@@@@@@@@@@@@@@@UpdatedEvent } from "../event/#########################.event";
import { Injectable } from "@nestjs/common";
import { @@@@@@@@@@@@@@@@@@@@@@Service } from '../#########################.service';

@Injectable()
export class @@@@@@@@@@@@@@@@@@@@@@Listener {

    constructor(
        protected service: @@@@@@@@@@@@@@@@@@@@@@Service,
    ) {}
    
    @OnEvent('#########################.created')
    async handle@@@@@@@@@@@@@@@@@@@@@@CreatedEvent(event: @@@@@@@@@@@@@@@@@@@@@@CreatedEvent) {
        // Code to run when ######################### has been created
    }

    @OnEvent('#########################.updated')
    async handleTestUpdatedEvent(event: @@@@@@@@@@@@@@@@@@@@@@UpdatedEvent) {
        // Code to run when ######################### has been updated
    }
}`

let eventTemplate = `import { @@@@@@@@@@@@@@@@@@@@@@ } from "../entities/#########################.entity";

export class @@@@@@@@@@@@@@@@@@@@@@CreatedEvent {
    constructor (public #########################: @@@@@@@@@@@@@@@@@@@@@@) {}
}

export class @@@@@@@@@@@@@@@@@@@@@@UpdatedEvent {
    constructor (public #########################: @@@@@@@@@@@@@@@@@@@@@@) {}
}`

const resourceName = await new Promise((resolve) => {
    readline.question('Enter resource name: ', input => {
        resolve(input);
        readline.close();
      });
}).then(e => e);

const resourceNameUpperCamel = camelize(resourceName);

entityTemplate     = replaceAll('@@@@@@@@@@@@@@@@@@@@@@', resourceNameUpperCamel, entityTemplate);
controllerTemplate = replaceAll('@@@@@@@@@@@@@@@@@@@@@@', resourceNameUpperCamel, controllerTemplate);
serviceTemplate    = replaceAll('@@@@@@@@@@@@@@@@@@@@@@', resourceNameUpperCamel, serviceTemplate);
moduleTemplate     = replaceAll('@@@@@@@@@@@@@@@@@@@@@@', resourceNameUpperCamel, moduleTemplate);
updateDtoTemplate  = replaceAll('@@@@@@@@@@@@@@@@@@@@@@', resourceNameUpperCamel, updateDtoTemplate);
createDtoTemplate  = replaceAll('@@@@@@@@@@@@@@@@@@@@@@', resourceNameUpperCamel, createDtoTemplate);
subscriberTemplate = replaceAll('@@@@@@@@@@@@@@@@@@@@@@', resourceNameUpperCamel, subscriberTemplate);
listenerTemplate   = replaceAll('@@@@@@@@@@@@@@@@@@@@@@', resourceNameUpperCamel, listenerTemplate);
eventTemplate      = replaceAll('@@@@@@@@@@@@@@@@@@@@@@', resourceNameUpperCamel, eventTemplate);

entityTemplate     = replaceAll('#########################', resourceName, entityTemplate);
controllerTemplate = replaceAll('#########################', resourceName, controllerTemplate);
serviceTemplate    = replaceAll('#########################', resourceName, serviceTemplate);
moduleTemplate     = replaceAll('#########################', resourceName, moduleTemplate);
updateDtoTemplate  = replaceAll('#########################', resourceName, updateDtoTemplate);
createDtoTemplate  = replaceAll('#########################', resourceName, createDtoTemplate);
subscriberTemplate = replaceAll('#########################', resourceName, subscriberTemplate);
listenerTemplate   = replaceAll('#########################', resourceName, listenerTemplate);
eventTemplate      = replaceAll('#########################', resourceName, eventTemplate);

const srcDir = __dirname + '/src/';
const resourceDir = srcDir+resourceName;

await new Promise((resolve) => {
    fs.mkdir(resourceDir, (err) => {
        if (err) {
            return console.error(err);
        }
        resolve();
    });
});

await new Promise((resolve) => {
    fs.mkdir(resourceDir+"/dto", (err) => {
        if (err) {
            return console.error(err);
        }
        resolve();
    });
});

await new Promise((resolve) => {
    fs.mkdir(resourceDir+"/entities", (err) => {
        if (err) {
            return console.error(err);
        }
        resolve();
    });
});

await new Promise((resolve) => {
    fs.mkdir(resourceDir+"/subscribers", (err) => {
        if (err) {
            return console.error(err);
        }
        resolve();
    });
});

await new Promise((resolve) => {
    fs.mkdir(resourceDir+"/event", (err) => {
        if (err) {
            return console.error(err);
        }
        resolve();
    });
});

await new Promise((resolve) => {
    fs.mkdir(resourceDir+"/listeners", (err) => {
        if (err) {
            return console.error(err);
        }
        resolve();
    });
});

/**
 * Create the files
 */

fs.writeFile(`${resourceDir}/entities/${resourceName}.entity.ts`, entityTemplate, err => {
    if (err) {
      console.error(err);
    }
});
fs.writeFile(`${resourceDir}/dto/create-${resourceName}.dto.ts`, createDtoTemplate, err => {
    if (err) {
      console.error(err);
    }
});
fs.writeFile(`${resourceDir}/dto/update-${resourceName}.dto.ts`, updateDtoTemplate, err => {
    if (err) {
      console.error(err);
    }
});
fs.writeFile(`${resourceDir}/subscribers/${resourceName}.subscriber.ts`, subscriberTemplate, err => {
    if (err) {
      console.error(err);
    }
});
fs.writeFile(`${resourceDir}/${resourceName}.controller.ts`, controllerTemplate, err => {
    if (err) {
      console.error(err);
    }
});
fs.writeFile(`${resourceDir}/${resourceName}.service.ts`, serviceTemplate, err => {
    if (err) {
      console.error(err);
    }
});
fs.writeFile(`${resourceDir}/${resourceName}.module.ts`, moduleTemplate, err => {
    if (err) {
      console.error(err);
    }
});

fs.writeFile(`${resourceDir}/listeners/${resourceName}.listener.ts`, listenerTemplate, err => {
    if (err) {
      console.error(err);
    }
});

fs.writeFile(`${resourceDir}/event/${resourceName}.event.ts`, eventTemplate, err => {
    if (err) {
      console.error(err);
    }
});

console.log(`Add ${resourceNameUpperCamel}Module to app.module.ts`);
}

go();