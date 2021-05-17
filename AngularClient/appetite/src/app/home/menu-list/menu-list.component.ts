import { Component, OnInit } from '@angular/core';
import { IRestaurant } from 'src/app/model/orderProcess/restaurant';
import { IMenu } from 'src/app/model/orderProcess/menu';
import { ShoppingService } from 'src/app/service/shopping.service';
import { ProductService } from 'src/app/service/product.service';

import { environment as env } from 'src/environments/environment';

@Component({
    selector: 'app-menu-list',
    templateUrl: './menu-list.component.html',
    styleUrls: ['./menu-list.component.scss'],
})
export class MenuListComponent implements OnInit {
    private _selRestaurant: IRestaurant;
    private _menuArray: IMenu[];
    private _picURL: string[];


    constructor(
        private shoppingService: ShoppingService,
        private productService: ProductService
    ) { }

    ngOnInit(): void {
        this.selRestaurant = this.shoppingService.selectedRestaurant;
        this.productService
            .fetchMenuArray(this.selRestaurant.email)
            .then((products) => {
                this.menuArray = products;
                this.prepFetchProdPics();
            });
    }

    public get selRestaurant(): IRestaurant {
        return this._selRestaurant;
    }
    public set selRestaurant(value: IRestaurant) {
        this._selRestaurant = value;
    }
    public get menuArray(): IMenu[] {
        return this._menuArray;
    }
    public set menuArray(value: IMenu[]) {
        this._menuArray = value;
    }
    public get picURL(): string[] {
        return this._picURL;
    }
    public set picURL(value: string[]) {
        this._picURL = value;
    }

    async prepFetchProdPics() {
        var i = 0;
        this.menuArray.forEach(element => {
            var baseUrl = env.api.url;
            var picUrl = element.pictures[0].split(' ').join('%20');
            element.pictures[0] = baseUrl + '/ProductService/Picture?picturePath=' + picUrl;
            i++;
        });
    }
}
