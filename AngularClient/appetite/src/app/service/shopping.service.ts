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
  private selectedRestaurant: IRestaurant;

  constructor(
    public restService: RestServiceService,
    public geoService: GeoService
  ) {}

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
  getSelectedCategory(): ICategory {
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
  getRestaurantArray(): IRestaurant[] {
    if (this.restaurantArray == undefined) {
      this.fetchRestaurantArray();
    }
    return this.restaurantArray;
  }

  /**
   * fetches the with the selected category and geolocation the restaurant array
   */
  fetchRestaurantArray() {
    // var geoLoc: IGeoLocation = this.geoService.getGeoLocation();
    this.geoService.getGeoLocation().then((pos) => {
      var geoLoc: IGeoLocation = { lng: pos.lng, lat: pos.lat };
      this.restaurantArray = this.restService.fetchRestaurantArray(
        this.selectedCategory,
        geoLoc
      );
    });
  }
}
