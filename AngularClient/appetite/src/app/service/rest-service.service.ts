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
import { IReview } from '../model/Review/review';

@Injectable({
    providedIn: 'root',
})
export class RestServiceService {
    restaurantFinderUrl: string =
        env.api.url + '/RestaurantFinder';
    restaurantCategoryUrl: string =
        env.api.url + '/RestaurantAdministration/Categories';
    productServiceURL: string = env.api.url + '/ProductService';
    postOrderURL: string = env.api.url + '/OrderService';
    orderServiceUserAllUrl: string = env.api.url + '/OrderService/UserGetAll';
    private sessToken: string;


    constructor(private http: HttpClient) {
        this.sessToken = sessionStorage.getItem('token');
    }

    fetchCategoryArray(): Observable<any> {
        return this.http.get(this.restaurantCategoryUrl).pipe(
            retry(3),
            catchError((err) => {
                this.handleError(err);
                return throwError(err);
            })
        );
    }

    /**
     * fetches the Restaurant Array
     * depends on the category, geographical location and the distance around that point
     * @returns RestaurantArray
     */
    fetchRestaurantArray(
        category: ICategory,
        geoLoc: IGeoLocation,
        distance: number
    ): Observable<any> {
        var restFinder: IRestaurantFinder = {
            coordinate: {
                latitude: geoLoc.lat,
                longitude: geoLoc.lng,
            },
            distance: distance,
            type: category.id,
        };
        return this.http.post(this.restaurantFinderUrl, restFinder).pipe(
            retry(3),
            catchError((err) => {
                this.handleError(err);
                return throwError(err);
            })
        );
    }

    fetchProductArray(email: string): Observable<any> {
        var params = new HttpParams().set('Email', email);
        return this.http.get(this.productServiceURL, { params });
    }

    postOrder(bodyOrder: IBodyOrder): Observable<any> {
        return this.http.post(this.postOrderURL, bodyOrder).pipe(
            retry(3),
            catchError((err) => {
                this.handleError(err);
                return throwError(err);
            })
        );
    }

    fetchOrderArray(email: string): Observable<any> {
        var params = new HttpParams().set('userEmail', email);
        return this.http.get(this.orderServiceUserAllUrl, { params })
            .pipe(
                retry(3),
                catchError((err) => {
                    this.handleError(err);
                    return throwError(err);
                })
            );
    }

    private handleError(error: HttpErrorResponse) {
        if (error.status === 0) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong.
            console.error(
                `Backend returned code ${error.status}, ` + `body was: ${error.error}`
            );
        }
        // Return an observable with a user-facing error message.

        // return throwError(
        //   'Something bad happened; please try again later.');
    }
}
