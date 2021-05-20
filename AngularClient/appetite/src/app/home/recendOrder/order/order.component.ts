import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
        private router: Router,
        private route: ActivatedRoute,
    ) { }

    ngOnInit(): void {
        this.orderService.fetchAllOrders().then((orders) => {
            this.orderArray = orders.reverse();
        })
    }

    writeReview(order: IOrder) {
        this.orderService.selectedOrder = order;
        this.router.navigate(['../review'], { relativeTo: this.route });
    }
}

