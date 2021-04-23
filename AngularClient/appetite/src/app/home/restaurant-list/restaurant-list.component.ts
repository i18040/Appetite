import { Component, OnInit } from '@angular/core';
import { ShoppingService } from 'src/app/service/shopping.service';
import { ICategory } from 'src/app/model/orderProcess/category';
import { IRestaurant } from 'src/app/model/orderProcess/restaurant';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.scss'],
})
export class RestaurantListComponent implements OnInit {
  public selCategory: ICategory;
  public restaurantArray: IRestaurant[];

  constructor(private shoppingService: ShoppingService) {}

  ngOnInit(): void {
    this.selCategory = this.shoppingService.getSelectedCategory();
    this.restaurantArray = this.shoppingService.getRestaurantArray();
  }
}
