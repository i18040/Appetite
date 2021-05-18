import { IProduct } from "./product";
import { IRestaurant } from "./restaurant";

export interface IOrderAmount {
    name: string;
    amount: number;
}

export interface IOrderProductAPI {
    name: string
}

export interface IBodyOrder {
    "userEmail": string,
    "restaurantEmail": string,
    "products": IOrderProductAPI[],
}

export interface IOrder {
    "id": number,
    "restaurant": IRestaurant,
    "deliveryCost": number,
    "orderReceivedTime": string,
    "products": IProduct[],
    "isDone": boolean,
}
