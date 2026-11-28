import { Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware{
    use(req: Request, res: Response, next: NextFunction) {
        console.log('Testing custom logger middleware....');

        if(!req.headers.authorization) {
            throw new UnauthorizedException('You are not authorized to view this page!');
        }
        
        next();
    }
}