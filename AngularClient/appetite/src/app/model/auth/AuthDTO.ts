import { IBaseResponse } from '../BaseResponse';

export interface ILoginResponse {
	id: number;
	name: string;
	email: string;
	token: string;
}

export interface RestaurantType{
	value: number;
	viewValue: string;
}

export interface IRegisterResponse extends IBaseResponse {
}

export interface IRestaurantRegisterResponse extends IBaseResponse {
}

export interface IRegistrationRequest {
	firstname: string;
	lastname: string;
	email: string;
	password: string;
}

export class IRestaurantRegistrationRequest {
	name: string;
	email: string;
	password: string;
	phoneNumber: number;
	restaurantType: number;
	street: string;
	houseNumber: string;
	zip: number;
	city: string;
	country: string;
	deliveryCost: number;
	latitude: number;
	longitude: number;
}
