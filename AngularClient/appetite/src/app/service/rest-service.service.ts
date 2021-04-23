import { Injectable } from '@angular/core';
import { IGeoLocation } from '../model/geo/geoLocation';
import { ICategory } from '../model/orderProcess/category';
import { IRestaurant } from '../model/orderProcess/restaurant';

@Injectable({
  providedIn: 'root',
})
export class RestServiceService {
  constructor() {}

  /**
   * fakeImplementation
   * @returns RestaurantArray
   */
  fetchRestaurantArray(
    category: ICategory,
    geoLoc: IGeoLocation
  ): IRestaurant[] {
    return require('src/app/Template/restaurantExample.json');
  }
}
