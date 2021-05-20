import { Injectable } from '@angular/core';
import { getMatIconFailedToSanitizeUrlError } from '@angular/material/icon';
import { getMaxListeners } from 'node:process';
import { IOrder } from '../model/orderProcess/order';
import { RestServiceService } from './rest-service.service';

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    private _selectedOrder: IOrder;

    constructor(private restService: RestServiceService) { }

    public get selectedOrder(): IOrder {
        return this._selectedOrder;
    }
    public set selectedOrder(value: IOrder) {
        this._selectedOrder = value;
    }

    /**
   * fetches all orders that a user placed
   * @returns IOrder[]
   */
    fetchAllOrders(): Promise<IOrder[]> {
        const user: string = 'a@b.de';
        return this.restService.fetchOrderArray(user).toPromise();
    }

    sendReview(text: string, rating: number, image: Object) {
        console.log('stuff');
    }

}