export interface ICar {
    id: String;
    registration_number: number;
    color: String;
    km: String;
    owner: String;
    image: {
        targetId: number;
        alt: string;
        title: string;
        width: number;
        height: number;
        url: string;
    }
}

export class Car implements ICar {

    constructor(
        public id: String,
        public registration_number: number,
        public color: String,
        public km: String,
        public owner: String,
        public image: any
    ) {

    }
}

export interface carQuery {
    entities: Car[]
}

export type Query = {
    carQuery: carQuery;
    Car: Car;
    carById: Car
}
