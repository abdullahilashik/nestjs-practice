import {
    Injectable,
    NestMiddleware,
    UnauthorizedException
} from '@nestjs/common';
import {
    NextFunction,
    Request,
    Response
} from 'express';

@Injectable()
export class MonoovaMiddleware implements NestMiddleware {
    use (req: Request, res: Response, next: NextFunction) {
        // check the header for monoova specific header
        // monoova-webhook-token
        // monova-client-id
        const webhookToken = req.headers['monoova-webhook-token'];
        const clientId = req.headers['monoova-client-id'];
        if(!webhookToken || !clientId) {
            throw new UnauthorizedException('Invalid monoova webhook arrived!');
        }
        next();
    }
}