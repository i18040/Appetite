import { Injectable } from '@angular/core';
import { getMatIconFailedToSanitizeUrlError } from '@angular/material/icon';
import { WebcamImage, WebcamModule } from 'ngx-webcam';
import { getMaxListeners } from 'node:process';
import { Observable, Observer } from 'rxjs';
import { IOrder } from '../model/orderProcess/order';
import { IReview } from '../model/Review/review';
import { RestServiceService } from './rest-service.service';

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    private _selectedOrder: IOrder;
    sessUser = JSON.parse(sessionStorage.getItem('user'));

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
        const user: string = this.sessUser.email;
        return this.restService.fetchOrderArray(user).toPromise();
    }

}