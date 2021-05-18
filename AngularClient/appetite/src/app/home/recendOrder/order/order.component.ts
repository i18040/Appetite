import { Component, OnInit } from '@angular/core';
import { IOrder } from 'src/app/model/orderProcess/order';
import { OrderService } from 'src/app/service/order.service';

@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
    public orderArray: IOrder[];

    constructor(
        public orderService: OrderService,
    ) { }

    ngOnInit(): void {
        this.orderService.fetchAllOrders().then((orders) => {
            this.orderArray = orders;
        })
    }



}

