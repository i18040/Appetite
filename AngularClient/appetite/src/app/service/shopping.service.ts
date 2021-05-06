declare var require: any;

import { Injectable } from '@angular/core';
// import { rejects } from 'node:assert';
// import { RSA_X931_PADDING } from 'node:constants';
import { Observable, ReplaySubject } from 'rxjs';
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
  private categoryArray: ICategory[];

  //**************Restaurant**************/
  private distance: number = 2000000;
  public restaurantArray: Observable<IRestaurant[]>;
  private selectedRestaurant: IRestaurant;

  constructor(
    public restService: RestServiceService,
    public geoService: GeoService
  ) {}

  //////////////********************Category Service********************/

  /**
   * setting the selected category
   *
   * @param index index of the category to set
   */
  setSelectedCategory(index: number) {
    if (this.categoryArray == undefined) {
      this.fetchCategoryArray();
    }
    this.selectedCategory = this.categoryArray[index];
  }
  /**
   * returns the selected Category
   * if undefined - set to 0 / all Categories
   * @returns ICategory
   */
  get selectedCategory$(): ICategory {
    if (this.selectedCategory == undefined) {
      this.setSelectedCategory(0);
    }
    return this.selectedCategory;
  }
  /**
   *
   * @returns Array with the category
   */
  getCategoryArray(): ICategory[] {
    if (this.categoryArray == undefined) {
      this.fetchCategoryArray();
    }
    return this.categoryArray;
  }
  /**
   * loads the CategoryArray
   */
  fetchCategoryArray() {
    this.categoryArray = require('src/app/Template/categoryExample.json');
  }

  //// **********************Restaurant Service*****************************************/

  /**
   * setting the selected restaurant
   *
   * @param index index of the category to set
   */
  setSelectedRestaurant(index: number) {
    if (this.restaurantArray == undefined) {
      this.fetchRestaurantArray();
    }
    this.selectedRestaurant = this.restaurantArray[index];
  }

  /**
   * returns the selected restaurant
   * if undefined - set to 0 / all
   * @returns ICategory
   */
  getSelectedRestaurant(): IRestaurant {
    if (this.selectedRestaurant == undefined) {
      this.setSelectedCategory(0);
    }
    return this.selectedRestaurant;
  }

  /**
   * returns all the restaurants the fit the search
   * @returns IRestaurant[]
   */
  get restaurantArray$(): Observable<IRestaurant[]> {
    return this.restaurantArray;
  }

  /**
   * fetches the with the selected category and geolocation the restaurant array
   */
  fetchRestaurantArray() {
    this.geoService
      .getGeoLocation()
      .then((pos) => {
        console.log(pos);
        this.restaurantArray = this.restService.fetchRestaurantArray(
          this.selectedCategory$,
          pos,
          this.distance
        );

        this.restaurantArray.subscribe(() => {
          console.log('fetching is a success!');
        });
        //   return this.restaurantArray;
      })
      //In case the geoLocation fails
      .catch((err) => {
        console.log(err);
        // rejects(err);
      });
  }
}
