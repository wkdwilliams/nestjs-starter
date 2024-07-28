import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserListener } from './listeners/user.listener';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        JwtModule.register({
            secret: process.env.ADMIN_JWT_SECRET
        }),
    ],
    controllers: [
        UserController,
    ],
    providers: [
        UserService,
        UserListener,
    ],
    exports: [UserService]
})
export class UserModule {}
