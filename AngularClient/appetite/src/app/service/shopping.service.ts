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

  setActiveCategory(id: number){
    this.activeCategory = id;
  }

  getCategoryArray():ICategory[]{
    this.CategoryArray = require("src/app/Template/categoryExample.json");
    return this.CategoryArray;
  }
}
