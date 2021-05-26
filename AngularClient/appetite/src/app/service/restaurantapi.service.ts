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
import { IBodyOrder, IOrder } from '../model/orderProcess/order';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class RestaurantapiService {

    private token: string;
    private email: string;

    constructor(private http: HttpClient) {
        this.token = sessionStorage.getItem('token');
        let sessUser = JSON.parse(sessionStorage.getItem('user'));
        this.email = sessUser.email;
    }

    public async fetchOrderArray(): Promise<any> {
        var params = new HttpParams().set('restaurantEmail', this.email);
        return this.http.get(`${env.api.url}/OrderService/RestaurantGetAll`, { params }).pipe(
            retry(3),
            catchError((err) => {
                this.handleError(err);
                return throwError(err);
            })
        ).toPromise();
    }

    public async orderFinished(order: IOrder): Promise<any> {
        let id = <string><unknown>order.id;
        return this.http.patch(`${env.api.url}/OrderService/FinishOrder?restaurantEmail=` + this.email + `&orderId=` + id, {}).pipe(
            retry(3),
            catchError((err) => {
                this.handleError(err);
                return throwError(err);
            })
        ).toPromise();
    }


    private handleError(error: HttpErrorResponse) {
        if (error.status === 0) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('a client-side or network error occurred:', error.error);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong.
            console.error(
                `Backend returned code ${error.status}, ` + `body was: ${error.error}`
            );
        }
    }


}
