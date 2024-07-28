import {
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  FindOptionsRelations,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { IPaginationOptions, Pagination, paginate } from 'nestjs-typeorm-paginate';
import { ResourceNotFoundExcepion } from '../Exceptions/ResourceNotFoundExcepion';
import { Logger, UnprocessableEntityException } from '@nestjs/common';
import { Cache } from '../cache/cache';
import { CustomException } from '../Exceptions/CustomException';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { ServiceExtraValues, ServiceOnFailure } from '../types/service-extra-values.type';
import { BadRequestException } from '../Exceptions/BadRequestException';

export abstract class Service<T> {
    /**
     * The relationships we will load
     */
    protected loadRelations: FindOptionsRelations<T> = {};
    /**
     * The cache patterns we will
     * clear when creating & updating
     */
    protected clearCachePatterns: string[] = [];

    /**
     * The logger we can use
     */
    protected logger: Logger;

    constructor(protected readonly repository?: Repository<T>) {
        this.logger = new Logger(this.constructor.name);
    }

    /**
     * The primary key of the entity we're using.
     * * You should override this if the primary key
     * * is something other than 'id'
    */
    protected getPrimaryKey(): string {
        return 'id';
    }

    /**
    * Clears the cache of this service instance
    */
    public clearCache(): void {
        for (const cache of this.clearCachePatterns) Cache.clearByPattern(cache);
    }

    /**
     * Find all with find options
     * and pagination result.
     * @param options
     * @param find
     * @returns Promise<Pagination<T>>
     */
    public async findAll(
        options: IPaginationOptions,
        findOptions?: FindOptionsWhere<T> | FindManyOptions<T>,
    ): Promise<Pagination<T>> {
        if (options.route === undefined)
            this.logger.warn("A route hasn't been provided");
        /**
         * * Because we sometimes have dynamic ordering, we have
         * * to check if the ordering column exists. This is because
         * * the server will crash if a column that doesn't exist is entered.
         */
        if (findOptions !== undefined && (findOptions as any).order) {
            const columnProperties = Object.keys(this.repository.metadata.propertiesMap);
            
            for (const orderColumn of Object.keys((findOptions as any).order)) {
                if (!columnProperties.includes(orderColumn)) {
                    throw new UnprocessableEntityException("Order by column does not exist");
                }
            }
        }

        return paginate<T>(this.repository, options, {
            relations: this.loadRelations,
            order: {
                [(options as any).order_by]: (options as any).sort_id,
                ...((findOptions!==undefined&&(findOptions as any).order)??(findOptions as any).order),
            },
            ...findOptions,
        });
    }

    /**
     * Find an entity by id.
     * * Accepts number or string because sometimes, the 
     * * id can be string, such as a UUID.
     * @throws ResourceNotFoundExcepion
     * @param id 
     * @param findOptions 
     * @returns 
     */
    public async findById(id: number|string, findOptions?: FindOneOptions<T>): Promise<T> {
        const result = await this.repository.findOne({
            relations: this.loadRelations,
            ...findOptions,
            where: ({ [this.getPrimaryKey()]: id } as any),
        });
        /**
         * We cannot continue if the entity is null
         */
        if (result === null) {
            this.logger.error(`Finding id ${id} returned null`);
            throw new ResourceNotFoundExcepion();
        }

        return result;
    }

    /**
     * Find many entities
     * @param findOptions
     * @returns Promise<T[]>
     */
    public async findMany(findOptions?: FindManyOptions<T>): Promise<T[]> {
        const result = await this.repository.find({
            relations: this.loadRelations,
            ...findOptions,
        });

        return result;
    }

    /**
     * Find one entity.
     * @throws ResourceNotFoundExcepion
     * @param findOptions
     * @returns Promise<T>
     */
    public async findOne(findOptions: FindOneOptions<T>): Promise<T> {
        const result = await this.repository.findOne({
            relations: this.loadRelations,
            ...findOptions,
        });
        /**
         * We cannot continue if the entity is null
         */
        if (result === null) {
            this.logger.error(
                `find record returned null with 
                where clause: ${JSON.stringify(findOptions)}`
            );
            throw new ResourceNotFoundExcepion();
        }

        return result;
    }

    /**
     * Returns wether or not a record exists.
     * @param where
     * @returns Promise<boolean>
     */
    public async exists(where: FindOptionsWhere<T>, findOptions?: FindManyOptions<T>): Promise<boolean> {
        return await this.repository.exist({
            where: where,
            ...findOptions,
        });
    }

    /**
     * Create an entity.
     * @param create 
     * @param extraValues 
     * @param onFailure 
     * @returns Promise<T>
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public async create(create: DeepPartial<T>, extraValues?: ServiceExtraValues, onFailure?: ServiceOnFailure<T>): Promise<T> {
        if (Object.keys(create).length === 0)
            throw new UnprocessableEntityException()
        /**
         * Create the new entity
         */
        let data: DeepPartial<T>;
        /**
         * Try to insert the entity
         */
        try {
            data = await this.repository.save(create);
        }
        catch (e) {
            /**
             * Run the callback if it's defined
             */
            if (onFailure) {
                onFailure(create);
            }
            /**
             * Throw the original error
             */
            throw e;
        }
        /**
         * Clear the cache
         */
        this.clearCache();
        
        return await this.findById((data as any).id);
    }

    /**
     * Create many entities
     * @param create 
     * @param extraValues 
     * @param onFailure 
     * @throws Error
     * @returns Promise<T>
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public async createMany(create: DeepPartial<T[]>, extraValues?: ServiceExtraValues, onFailure?: ServiceOnFailure<T[]>): Promise<T[]> {
        if (create.length === 0)
            throw new UnprocessableEntityException()
        /**
         * Create the new entities in the database
         */
        let entities: DeepPartial<T[]>;
        /**
         * Try to insert the entities
         */
        try {
            entities = await this.repository.save(create) as DeepPartial<T[]>;
        }
        catch (e) {
            /**
             * Run the callback if it's defined
             */
            if (onFailure) {
                onFailure(create);
            }
            /**
             * Throw the original error
             */
            throw e;
        }
        /**
         * Clear the cache
         */
        this.clearCache();
        /**
         * Get our newly created entities for return
         */
        const promises = entities.map(async (entity: DeepPartial<T>) => {
            return await this.findById((entity as any).id);
        }) as T[];

        return await Promise.all<T[]>(promises);
    }

    /**
     * Update an entity by id
     * @param id
     * @param update
     * @param extraValues 
     * @param onFailure 
     * @throws UnprocessableEntityException
     * @throws CustomException
     * @returns Promise<T>
     */
    public async update(id: number|T, update: DeepPartial<T>, extraValues?: ServiceExtraValues, onFailure?: ServiceOnFailure<T>): Promise<T> {
        if (Object.keys(update).length === 0)
            throw new UnprocessableEntityException();
        
        if (this.getPrimaryKey() !== "id") {
            throw new BadRequestException(
                `Primary key is not called id. You should override this update function 
                and use the update function inside the repository instead.`
            );
        }
        /**
         * If we pass in an entity, convert the entity to a number id
         */
        if (typeof id === 'object')
            id = (id as any).id;
        /**
         * If the record does not exist, we cannot continue
         */
        if (!await this.exists({ id } as any))
        {
            this.logger.error(`ID ${id} does not exist when trying to update`);
            throw new CustomException("Resource not found", StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND);
        }
        /**
         * Remove one-to-many relations from the object
         */
        for (const relation of Object.entries(this.loadRelations)) {
            if (Array.isArray(update[relation[0]]))
                delete update[relation[0]]
        }
        /**
         * Try to update the entity
         */
        try {
            await this.repository.save({ ...update, id });
        }
        catch (e) {
            /**
             * Run the callback if it's defined
             */
            if (onFailure) {
                onFailure(update);
            }
            /**
             * Throw the original error
             */
            throw e;
        }
        /**
         * Clear the cache
         */
        this.clearCache();

        return await this.findById(id as number);
    }

    /**
     * This soft deletes a given entity.
     * Accepts an entity id, or entity object.
     * @param id
     * @returns Promise<T>
     */
    public async remove(entity: number|T):      Promise<T>
    public async remove(entity: number[]|T[]):  Promise<T[]>
    public async remove(entity: unknown):       Promise<unknown> {
        /**
         * If an array has been passed in, we iterate the array
         * and hard remove each element
         */
        if (Array.isArray(entity)) {
            const removed: T[] = [];
            for (let e of entity) {
                if (typeof e === 'number')
                    e = await this.findById(e);
    
                await this.repository.softRemove(e);
                removed.push(e);
            }
            /**
             * Clear the cache
             */
            this.clearCache();

            return removed;
        }
        /**
         * If an id/number has been passed in, we convert that
         * to an entity.
         */
        if (typeof entity === 'number')
            entity = await this.findById(entity);
        /**
         * Clear the cache
         */
        this.clearCache();
         
        await this.repository.softRemove(entity as T);

        return entity;
    }

    /**
     * This hard deletes a given entity or entities.
     * Accepts an entity id, or entity object, or an array of both.
     * ! This will delete the record forever
     * @param entity
     * @returns Promise<T>
     */
    public async hardRemove(entity: number|T):      Promise<T>
    public async hardRemove(entity: number[]|T[]):  Promise<T[]>
    public async hardRemove(entity: unknown):       Promise<unknown> {
        /**
         * If an array has been passed in, we iterate the array
         * and hard remove each element
         */
        if (Array.isArray(entity)) {
            const removed: T[] = [];
            for (let e of entity) {
                if (typeof e === 'number')
                    e = await this.findById(e);
    
                await this.repository.remove(e);
                removed.push(e);
            }
            /**
             * Clear the cache
             */
            this.clearCache();

            return removed;
        }
        /**
         * If an id/number has been passed in, we convert that
         * to an entity.
         */
        if (typeof entity === 'number')
            entity = await this.findById(entity);
        /**
         * Clear the cache
         */
        this.clearCache();
        
        await this.repository.remove(entity as T);

        return entity;
    }

    /**
     * This undeletes/restores a soft deleted entity.
     * Accepts an entity id, entity object, array of objects
     * or an array of ids.
     * @param entity 
     * @returns 
     */
    public async restore(entity: number|T):     Promise<T>
    public async restore(entity: number[]|T[]): Promise<T[]>
    public async restore(entity: unknown):      Promise<T|T[]> {
        let restore: T|T[] = null;

        if (Array.isArray(entity))
            restore = await this.repository.recover(entity);
        else if (typeof entity === 'number')
            restore = await this.repository.recover(await this.findById(entity, { withDeleted: true }));
        else
            restore = await this.repository.recover(entity as T);

        this.clearCache();

        return restore;
    }

    /**
     * Get the count of entities
     * @param findOptions 
     * @returns 
     */
    public async count(findOptions?: FindManyOptions<T>): Promise<number> {
        return await this.repository.count(findOptions)
    }
}
