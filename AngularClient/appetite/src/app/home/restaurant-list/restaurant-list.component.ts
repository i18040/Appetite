import { Component, OnInit } from '@angular/core';
import { ShoppingService } from 'src/app/service/shopping.service';
import { ICategory } from 'src/app/model/orderProcess/category';
import { IRestaurant } from 'src/app/model/orderProcess/restaurant';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { environment as env } from 'src/environments/environment';

@Component({
    selector: 'app-restaurant-list',
    templateUrl: './restaurant-list.component.html',
    styleUrls: ['./restaurant-list.component.scss'],
})
export class RestaurantListComponent implements OnInit {
    public selCategory: ICategory;
    public restaurantArray: IRestaurant[];

    constructor(
        public shoppingService: ShoppingService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.selCategory = this.shoppingService.selectedCategory$;
        this.shoppingService.fetchRestaurantArray().then((restaurants) => {
            this.restaurantArray = restaurants;
            this.prepFetchResPics();
        });
    }

    /**
     * switches Tab to the product selection
     *
     * @param restaurant list the product of restaurant with that index
     */
    showProduct(restaurant: IRestaurant) {
        this.shoppingService.selectedRestaurant = restaurant;
        this.router.navigate(['../product'], { relativeTo: this.route });
    }

    async prepFetchResPics() {
        var i = 0;
        this.restaurantArray.forEach(element => {
            if (element.logo == null) {
                element.logo = '/assets/haus.png'
            } else {
                var baseUrl = env.api.url;
                var picUrl = element.logo.split(' ').join('%20');
                element.logo = baseUrl + '/RestaurantFinder/Logo?picturePath=' + picUrl;
            }
            i++;
        });
    }
}
