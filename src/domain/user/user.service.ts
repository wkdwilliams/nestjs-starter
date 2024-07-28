import { Injectable } from '@nestjs/common';
import { Service } from '../../components/abstract/service';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, FindOptionsRelations, Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ServiceExtraValues, ServiceOnFailure } from '../../components/types/service-extra-values.type';
import { UserCreatedEvent, UserUpdatedEvent  } from './event/user.event';
import { JwtService } from '@nestjs/jwt';
import { LoginIncorrectException } from '../../components/Exceptions/LoginIncorrectException';
import { VerifyPassword, GetPasswordHash } from '../../components/utils/hashing';
import { Authentication } from './types/user.type';
import { BadRequestException } from '../../components/Exceptions/BadRequestException';

@Injectable()
export class UserService extends Service<User> {

    protected loadRelations: FindOptionsRelations<User> = {
        booking: {
            restaurant: true,
        }
    };

    constructor(
        @InjectRepository(User)
        protected repository:   Repository<User>,
        protected eventEmitter: EventEmitter2,
        protected jwtService: JwtService,
    ) {
        super(repository);
    }

    public async authenticate(username: string, password: string): Promise<Authentication> {
        /**
         * Check if email exists first
         */
        if (!(await this.exists({
            username: username
        }))) throw new LoginIncorrectException();

        const user = await this.findOne({
            where: {
                username: username
            }
        });
        
        /**
         * Verify the password is correct
         */
        if (!(await VerifyPassword(user.password, password))) {
            throw new LoginIncorrectException();
        }
        
        return {
            user,
            token: this.jwtService.sign({
                id: user.id,
            },
            {
                expiresIn: '99999999s',
                secret: process.env.JWT_SECRET
            },
        )};
    }

    public async tokenIsValid(token: string): Promise<boolean> {
        try {
            this.jwtService.verify(token, {
                secret: process.env.JWT_SECRET
            });

            return true;
        }
        catch (e) {
            return false;
        }
    }

    /**
     * Create a user entity
     * @param create 
     * @param extraValues 
     * @param onFailure
     * @returns 
     */
    public async create(
        create:         DeepPartial<User>,
        extraValues?:   ServiceExtraValues,
        onFailure?:     ServiceOnFailure<User>
    ): Promise<User> {
        if (await this.exists({username: create.username})) {
            throw new BadRequestException("Username already taken");
        }

        create.password = await GetPasswordHash(create.password);

        /**
         * Create the entity
         */
        const created = await super.create(create, null, onFailure)
        /**
         * Fire the user created event
         */
        await this.eventEmitter.emitAsync('user.created', new UserCreatedEvent(created))

        return created;
    }

    /**
     * Update user entity
     * @param id 
     * @param update 
     * @param extraValues 
     * @param onFailure 
     * @returns 
     */
    public async update(
        id:             number|User,
        update:         DeepPartial<User>,
        extraValues?:   ServiceExtraValues,
        onFailure?:     ServiceOnFailure<User>
    ): Promise<User> {
        /**
         * Update the entity
         */   
        const updated = await super.update(id, update, null, onFailure);
        /**
         * Fire the user updated event
         */
        await this.eventEmitter.emitAsync('user.created', new UserUpdatedEvent(updated))

        return updated;
    }
}
