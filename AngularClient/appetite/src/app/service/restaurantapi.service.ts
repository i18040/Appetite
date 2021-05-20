import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { IGeoLocation } from '../model/geo/geoLocation';
import { ICategory } from '../model/orderProcess/category';
import { IRestaurantFinder } from '../model/orderProcess/restaurantFinder';

import { environment as env } from 'src/environments/environment';
import { IBodyOrder } from '../model/orderProcess/order';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RestaurantapiService {

  private token: string;

  constructor(private http: HttpClient) {
		this.token = sessionStorage.getItem('token');
	}



}
