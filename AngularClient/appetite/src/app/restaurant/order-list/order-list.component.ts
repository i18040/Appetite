import { RestaurantapiService } from './../../service/restaurantapi.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnyNsRecord } from 'node:dns';
import { IOrder } from 'src/app/model/orderProcess/order';

@Component({
    selector: 'app-order-list',
    templateUrl: './order-list.component.html',
    styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
    orderArray: IOrder[];

    constructor(
        private apiService: RestaurantapiService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.apiService.fetchOrderArray().then((order) => {
            this.orderArray = order;
        })
    }

    async orderFinished(order: IOrder, index: number) {
        try {
            await this.apiService.orderFinished(order);
            this.orderArray[index].isDone = true;
        } catch (err) {
            console.error(err);
        }
    }
}