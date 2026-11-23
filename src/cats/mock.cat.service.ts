import { Injectable } from "@nestjs/common";

@Injectable()
export class MockCatService {
    data() {
        return 'Coming from mockcatservice';
    }
}

export const CatsList = [
    {
        id: 1,
        name: 'Persian Cat',
        color: 'orange'
    }
]