declare var require: any;

import { Injectable } from '@angular/core';
import { IGeoLocation } from '../model/geo/geoLocation';
import { ICategory } from '../model/orderProcess/category';
import { IRestaurant } from '../model/orderProcess/restaurant';
import { GeoService } from './geo.service';
import { RestServiceService } from './rest-service.service';

@Injectable({
  providedIn: 'root',
})
export class ShoppingService {
  private categoryArray: ICategory[];
  private selectedCategory: ICategory;
  private restaurantArray: IRestaurant[];

  constructor(
    public restService: RestServiceService,
    public geoService: GeoService
  ) {}

  /**
   * setting the category number to filter the restaurants
   *
   * @param id ID of the category to set
   */
  setSelectedCategory(id: number) {
    if (this.categoryArray == undefined) {
      this.fetchCategoryArray();
    }
    this.selectedCategory = this.categoryArray[id];
  }

  /**
   * returns the selected Category
   * if undefinded - set to 0 / all Categories
   * @returns ICategory
   */
  getSelectedCategory(): ICategory {
    if (this.selectedCategory == undefined) {
      this.setSelectedCategory(0);
    }
    return this.selectedCategory;
  }

  /**
   *
   * @returns Array with the categorys
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

  getRestaurantArray(): IRestaurant[] {
    if (this.restaurantArray == undefined) {
      this.fetchRestaurantArray();
    }
    return this.restaurantArray;
  }

  fetchRestaurantArray() {
    var geoLoc: IGeoLocation = this.geoService.getGeoLocation();
    this.restaurantArray = this.restService.fetchRestaurantArray(
      this.selectedCategory,
      geoLoc
    );
  }
}
