import { Component, OnInit } from '@angular/core';
import { ShoppingService } from 'src/app/service/shopping.service';
import { ICategory } from 'src/app/Template/category';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.scss']
})
export class RestaurantListComponent implements OnInit {

  public selCategory: ICategory;

  restaurantArray: string[]

  constructor(
    private shoppingService: ShoppingService,
  ) { }

  ngOnInit(): void {
    this.selCategory = this.shoppingService.getSelectedCategory();
    this.restaurantArray = ['R1', 'Dönerbude', 'MeisterPasta', 'AfricanFrodo', 'MexicanMix']
  }

}
