import { Injectable, NestMiddleware } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { NextFunction } from "express";
import { env } from "process";
import { UserService } from "../../domain/user/user.service";
import { InvalidTokenException } from "../Exceptions/InvalidTokenException";
import { NotAuthenticatedException } from "../Exceptions/NotAuthenticatedException";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor() {}

    async use(req: Request, res: Response, next: NextFunction) {
        const bearer = req.headers['authorization'];

        if (bearer === undefined || bearer.split('Bearer ').length < 2)
            throw new NotAuthenticatedException();

        const token = bearer.split('Bearer ')[1];

        /**
         * ! We need to fix this!
         */
		try {
			// Throws exception if incorrect
        	await new JwtService({secret: process.env.JWT_SECRET,}).verify(token)
		} catch (e){
			throw new InvalidTokenException();
		}

        next();
    }
}