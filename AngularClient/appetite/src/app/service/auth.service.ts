import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { IUser } from 'src/app/model/auth/IUser';
import {
	ILoginResponse,
	IRegisterResponse,
	IPasswordResetResponse,
	IRegistrationRequest,
} from 'src/app/model/auth/AuthDTO';

import { environment as env } from 'src/environments/environment';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	constructor(private http: HttpClient) {
		const sessToken = sessionStorage.getItem('token');
		if (sessToken) {
			this._token = sessToken;
		}

		const sessUser = JSON.parse(sessionStorage.getItem('user'));
		if (sessUser) {
			this._user = sessUser;
		}
	}

	private _token: string;
	public get token() {
		return this._token;
	}

	private _user: IUser;
	public get user() {
		return this._user;
	}

	public get isLoggedIn() {
		return this._token !== undefined;
	}

	public async login(email: string, password: string) {
		try {
			const response = await this.http
				.post<ILoginResponse>(`${env.api.url}/UserService/authenticate`, {
					email,
					password
					}).toPromise();

			this.setToken(response.token);
			this.setUser(response.id, response.name, response.email);
		} catch (err) {
			throw err;
		}
	}

	public async register(email: string, name: string, password: string) {
		const response = await this.http.post<IRegisterResponse>(`${env.api.url}/UserService`, {
			email,
			name,
			password,
		})
		.toPromise();
	}

	public async deleteAccount(mail: string) {
		const options = {
			headers: new HttpHeaders({
			  'Content-Type': 'application/json',
			  'Authorization': 'Bearer ' + this._token,
			}),
			body: { "email": mail } ,
		  };
		  
		  this.http
			.delete(`${env.api.url}/UserService`, options)
			.toPromise();
	}

	private setToken(token: string) {
		this._token = token;
		sessionStorage.setItem('token', token);
	}

	private setUser(id: number, name: string, email: string) {
		let user = new IUser();
		user.id = id;
		user.name = name;
		user.email = email;
		this._user = user;
		sessionStorage.setItem('user', JSON.stringify(user));
	}

	public logout() {
		this._token = undefined;
		this._user = undefined;
		sessionStorage.removeItem('token');
		sessionStorage.removeItem('user');
	}
}
