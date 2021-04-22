declare var require: any

import { Injectable } from '@angular/core';
import { ICategory } from '../Template/category';
import { RestServiceService } from './rest-service.service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {

  private CategoryArray: ICategory[];
  private activeCategory: number;

  constructor(
    public restService: RestServiceService,
  ) { }

  /**
   * setting the category number to filter the restaurants
   * 
   * @param id ID of the category to set
   */
  setActiveCategory(id: number){
    this.activeCategory = id;
    
  }

  /**
   * 
   * @returns Array with the categorys
   */
  getCategoryArray():ICategory[]{
    this.CategoryArray = require("src/app/Template/categoryExample.json");
    return this.CategoryArray;
  }
}
