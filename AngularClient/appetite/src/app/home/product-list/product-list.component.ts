import { Component, OnInit } from '@angular/core';
import { IRestaurant } from 'src/app/model/orderProcess/restaurant';
import { IProduct } from 'src/app/model/orderProcess/product';
import { ShoppingService } from 'src/app/service/shopping.service';
import { ProductService } from 'src/app/service/product.service';

import { environment as env } from 'src/environments/environment';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
    private _selRestaurant: IRestaurant;
    private _productArray: IProduct[];
    private _picURL: string[];


    constructor(
        private shoppingService: ShoppingService,
        private productService: ProductService
    ) { }

    ngOnInit(): void {
        this.selRestaurant = this.shoppingService.selectedRestaurant;
        this.productService
            .fetchProductArray(this.selRestaurant.email)
            .then((products) => {
                this.productArray = products;
                this.prepFetchProdPics();
            });
    }

    public get selRestaurant(): IRestaurant {
        return this._selRestaurant;
    }
    public set selRestaurant(value: IRestaurant) {
        this._selRestaurant = value;
    }
    public get productArray(): IProduct[] {
        return this._productArray;
    }
    public set productArray(value: IProduct[]) {
        this._productArray = value;
    }
    public get picURL(): string[] {
        return this._picURL;
    }
    public set picURL(value: string[]) {
        this._picURL = value;
    }

    async prepFetchProdPics() {
        var i = 0;
        this.productArray.forEach(element => {
            if (element.pictures[0] == "") {
                element.pictures[0] = '/assets/logo-essen.png';
            } else {
                var baseUrl = env.api.url;
                var picUrl = element.pictures[0].split(' ').join('%20');
                element.pictures[0] = baseUrl + '/ProductService/Picture?picturePath=' + picUrl;
            }
            i++;
        });
    }
}
