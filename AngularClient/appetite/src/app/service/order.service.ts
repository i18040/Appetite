import { Injectable } from '@angular/core';
import { getMatIconFailedToSanitizeUrlError } from '@angular/material/icon';
import { getMaxListeners } from 'node:process';
import { IOrder } from '../model/orderProcess/order';
import { RestServiceService } from './rest-service.service';

@Injectable({
    providedIn: 'root'
})
export class OrderService {

    constructor(private restService: RestServiceService) { }

    /**
   * fetches all orders that a user placed
   * @returns IOrder[]
   */
    fetchAllOrders(): Promise<IOrder[]> {
        const user: string = 'klaus@gmail.com';
        return this.restService.fetchOrderArray(user).toPromise();

    }
}