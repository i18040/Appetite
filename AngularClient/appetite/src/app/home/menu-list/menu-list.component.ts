import { Component, OnInit } from '@angular/core';
import { IRestaurant } from 'src/app/model/orderProcess/restaurant';
import { IMenu } from 'src/app/model/orderProcess/menu';
import { ShoppingService } from 'src/app/service/shopping.service';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss'],
})
export class MenuListComponent implements OnInit {
  public selRestaurant: IRestaurant;
  public menuArray: IMenu[];

  constructor(private shoppingService: ShoppingService) {}

  ngOnInit(): void {
    this.selRestaurant = this.shoppingService.getSelectedRestaurant();
    this.menuArray = [
      {
        id: 0,
        name: 'chees burger',
      },
      {
        id: 1,
        name: 'Asian Soup',
      },
      {
        id: 2,
        name: 'Hot Dog',
      },
      {
        id: 3,
        name: 'Döner',
      },
    ];
  }
}
