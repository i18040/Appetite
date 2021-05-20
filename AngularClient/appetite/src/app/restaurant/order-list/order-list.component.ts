import { RestaurantapiService } from './../../service/restaurantapi.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnyNsRecord } from 'node:dns';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  orderArray: any[];

  constructor(
    private restaurantapiService: RestaurantapiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    //this.orderArray = this.restaurantapiService.fetchOrderArray();
  }

}




