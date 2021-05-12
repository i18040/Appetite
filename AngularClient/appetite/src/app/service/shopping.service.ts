declare var require: any;

import { error } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, throwError } from 'rxjs';
import { ICategory } from '../model/orderProcess/category';
import { IRestaurant } from '../model/orderProcess/restaurant';
import { GeoService } from './geo.service';
import { RestServiceService } from './rest-service.service';

@Injectable({
  providedIn: 'root',
})
export class ShoppingService {
  //**************Category**************/
  private selectedCategory: ICategory;

  //**************Restaurant**************/
  private maxDistance: number = 2000000;
  private selectedRestaurant: IRestaurant;

  constructor(
    public restService: RestServiceService,
    public geoService: GeoService
  ) {}

  //////////////********************Category Service********************/

  /**
   * setting the selected category
   * @param category category to set
   */
  setSelectedCategory(category: string, number: number) {
    this.selectedCategory = { id: number, name: category };
  }
  /**
   * returns the selected Category
   * @returns ICategory
   */
  get selectedCategory$(): ICategory {
    return this.selectedCategory;
  }
  /**
   * fetches the CategoryArray
   */
  async fetchCategoryArray(): Promise<any> {
    return this.restService.fetchCategoryArray().toPromise();
  }

  //// **********************Restaurant Service*****************************************/

  /**
   * setting the selected restaurant
   *
   * @param index index of the category to set
   */
  //   setSelectedRestaurant(index: number) {
  //     if (this._restaurantArray == undefined) {
  //       this.fetchRestaurantArray();
  //     }
  //     this.selectedRestaurant = this._restaurantArray[index];
  //   }

  /**
   * returns the selected restaurant
   * if undefined - set to 0 / all
   * @returns ICategory
   */
  //   getSelectedRestaurant(): IRestaurant {
  //     if (this.selectedRestaurant == undefined) {
  //       this.setSelectedCategory(0);
  //     }
  //     return this.selectedRestaurant;
  //   }

  /**
   * fetches the with the selected category and geolocation the restaurant array
   * @returns promise of Restaurant Array
   */
  async fetchRestaurantArray(): Promise<IRestaurant[]> {
    var pos = await this.geoService.getGeoLocation();
    return this.restService
      .fetchRestaurantArray(this.selectedCategory, pos, this.maxDistance)
      .toPromise();
  }
}
