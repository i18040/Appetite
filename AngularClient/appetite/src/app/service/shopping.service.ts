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
  private categoryArray: ICategory[];

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
  getSelectedRestaurant(): IRestaurant {
    if (this.selectedRestaurant == undefined) {
      this.setSelectedCategory(0);
    }
    return this.selectedRestaurant;
  }

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
