declare var require: any;

import { Injectable } from '@angular/core';
import { ICategory } from '../model/orderProcess/category';
import { IRestaurant } from '../model/orderProcess/restaurant';
import { RestServiceService } from './rest-service.service';

@Injectable({
  providedIn: 'root',
})
export class ShoppingService {
  private categoryArray: ICategory[];
  private selectedCategory: ICategory;
  private restaurantsArray: IRestaurant[];

  constructor(public restService: RestServiceService) {}
  
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
}
