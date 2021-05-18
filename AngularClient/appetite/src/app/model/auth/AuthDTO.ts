import { IBaseResponse } from '../BaseResponse';

export interface ILoginResponse {
	id: number;
	name: string;
	email: string;
	token: string;
}

export interface IRegisterResponse extends IBaseResponse {
}

export interface IPasswordResetRequest {
	passwordResetKey: string;
	newPasword: string;
}

export interface IPasswordResetResponse {}

export interface IRegistrationRequest {
	firstname: string;
	lastname: string;
	email: string;
	password: string;
}
