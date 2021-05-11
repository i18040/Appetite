import { Component, OnInit } from '@angular/core';
import { ShoppingService } from 'src/app/service/shopping.service';
import { ICategory } from 'src/app/model/orderProcess/category';
import { IRestaurant } from 'src/app/model/orderProcess/restaurant';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.scss'],
})
export class RestaurantListComponent implements OnInit {
  public selCategory: ICategory;
  private sub: Subscription;
  public restaurantArray: IRestaurant[];

  constructor(
    public shoppingService: ShoppingService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.selCategory = this.shoppingService.selectedCategory$;
    this.shoppingService.fetchRestaurantArray().then((restaurants) => {
      this.restaurantArray = restaurants;
    });
  }

  /**
   * switches Tab to the menu selection
   *
   * @param restaurant list the menu of restaurant with that index
   */
  showMenu(restaurant: number) {
    // this.shoppingService.setSelectedRestaurant(restaurant);
    this.router.navigate(['../menu'], { relativeTo: this.route });
  }
}
