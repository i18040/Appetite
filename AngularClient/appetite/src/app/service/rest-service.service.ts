import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { IGeoLocation } from '../model/geo/geoLocation';
import { ICategory } from '../model/orderProcess/category';
import { IRestaurant } from '../model/orderProcess/restaurant';
import { IRestaurantFinder } from '../model/orderProcess/restaurantFinder';

@Injectable({
  providedIn: 'root',
})
export class RestServiceService {
  restaurantFinderUrl: string =
    'https://appetite.kr31sw1chs.de/RestaurantFinder';

  constructor(private http: HttpClient) {}

  /**
   * fakeImplementation
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
