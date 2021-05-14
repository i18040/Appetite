import { Component, OnInit } from '@angular/core';
import { IRestaurant } from 'src/app/model/orderProcess/restaurant';
import { IMenu } from 'src/app/model/orderProcess/menu';
import { ShoppingService } from 'src/app/service/shopping.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss'],
})
export class MenuListComponent implements OnInit {
  public selRestaurant: IRestaurant;
  public menuArray: IMenu[];

  constructor(
    private shoppingService: ShoppingService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.selRestaurant = this.shoppingService.selectedRestaurant;
    this.productService
      .fetchMenuArray(this.selRestaurant.email)
      .then((products) => {
        this.menuArray = products;
      });
  }
}
