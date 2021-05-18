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

