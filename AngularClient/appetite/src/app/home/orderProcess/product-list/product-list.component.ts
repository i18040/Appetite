import { Component, OnInit } from '@angular/core';
import { IRestaurant } from 'src/app/model/orderProcess/restaurant';
import { IProduct } from 'src/app/model/orderProcess/product';
import { ShoppingService } from 'src/app/service/shopping.service';
import { ProductService } from 'src/app/service/product.service';

import { environment as env } from 'src/environments/environment';
import { IOrderAmount } from 'src/app/model/orderProcess/order';
import { Router } from '@angular/router';
import { InfoDialogComponent } from '../../info-dialog/info-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
    private _selRestaurant: IRestaurant;
    private _productArray: IProduct[];
    private _picURL: string[];
    public orderAmount: IOrderAmount[] = [];
    private dialogRef: MatDialogRef<InfoDialogComponent>;


    constructor(
        private shoppingService: ShoppingService,
        private productService: ProductService,
        private router: Router,
        private dialog: MatDialog,
    ) { }

    ngOnInit(): void {
        this.selRestaurant = this.shoppingService.selectedRestaurant;
        this.productService
            .fetchProductArray(this.selRestaurant.email)
            .then((products) => {
                this.productArray = products;
                this.prepFetchProdPics();
                this.initOrderAmount();
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


    prepFetchProdPics() {
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

    initOrderAmount() {
        this.productArray.forEach(product => {
            const prodAmount: IOrderAmount = {
                name: product.name,
                amount: 0,
            }
            this.orderAmount.push(prodAmount);
        });
    }

    addAmount(index: number) {
        if (this.orderAmount[index].amount < 99) {
            this.orderAmount[index].amount += 1;
        }
    }

    subAmount(index: number) {
        if (this.orderAmount[index].amount >= 1) {
            this.orderAmount[index].amount -= 1;
        }
    }

    openDialog(message: string) {
        this.dialogRef = this.dialog.open(InfoDialogComponent, {
            data: { message: message },
        });
    }

    async order() {
        try {
            await this.productService.placeOrder(this.orderAmount, this.selRestaurant);
            this.openDialog('Successfully placed your Order');
            this.router.navigate(['/home']);
        } catch (err) {
            console.error(err);
            this.openDialog('There went something wrong with your order, try again later');
        }
    }
}
