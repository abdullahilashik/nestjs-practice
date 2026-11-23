import { Injectable } from '@nestjs/common';

@Injectable()
export class CatsService {
    data() {
        return 'Coming from catsService';
    }
}
