import { Component, OnInit } from '@angular/core';
import { ShoppingService } from 'src/app/service/shopping.service';
import { ICategory } from 'src/app/model/orderProcess/category';
import { IRestaurant } from 'src/app/model/orderProcess/restaurant';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.scss'],
})
export class RestaurantListComponent implements OnInit {
  public selCategory: ICategory;
  //   public restaurantArray: IRestaurant[];

  constructor(
    public shoppingService: ShoppingService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.selCategory = this.shoppingService.getSelectedCategory();
    this.shoppingService.fetchRestaurantArray();
    // this.restaurantArray = this.shoppingService.getRestaurantArray();
  }

  /**
   * switches Tab to the menu selection
   *
   * @param restaurant list the menu of restaurant with that index
   */
  showMenu(restaurant: number) {
    this.shoppingService.setSelectedRestaurant(restaurant);
    this.router.navigate(['../menu'], { relativeTo: this.route });
  }
}
