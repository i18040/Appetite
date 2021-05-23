import { Injectable } from '@angular/core';
import { ProductListComponent } from '../home/orderProcess/product-list/product-list.component';
import { IBodyOrder, IOrderAmount, IOrderProductAPI } from '../model/orderProcess/order';
import { IProduct } from '../model/orderProcess/product';
import { IRestaurant } from '../model/orderProcess/restaurant';
import { IRestaurantFinder } from '../model/orderProcess/restaurantFinder';
import { RestServiceService } from './rest-service.service';



@Injectable({
    providedIn: 'root',
})
export class ProductService {
    constructor(private restService: RestServiceService) { }
    sessUser = JSON.parse(sessionStorage.getItem('user'));

    /**
     * fetches the product of a restaurant
     * @param email email of the restaurant
     * @returns array with product
     */
    async fetchProductArray(email: string): Promise<IProduct[]> {
        return this.restService.fetchProductArray(email).toPromise();
    }

    placeOrder(order: IOrderAmount[], restaurant: IRestaurant) {
        var bodyInfos: IBodyOrder = {
            "userEmail": this.sessUser.email,
            "restaurantEmail": restaurant.email,
            "products": this.createAPIOrder(order),
        }
        return this.restService.postOrder(bodyInfos).toPromise();
    }

    createAPIOrder(order): IOrderProductAPI[] {
        var orderArray: IOrderProductAPI[] = [];
        order.forEach(product => {
            for (var i = 0; i < product.amount; i++) {
                orderArray.push({ name: product.name });
            };
        });
        return orderArray;
    }
}
