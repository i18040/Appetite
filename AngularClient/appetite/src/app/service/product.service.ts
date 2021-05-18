import { Injectable } from '@angular/core';
import { IProduct } from '../model/orderProcess/product';
import { RestServiceService } from './rest-service.service';

@Injectable({
    providedIn: 'root',
})
export class ProductService {
    constructor(private restService: RestServiceService) { }

    /**
     * fetches the product of a restaurant
     * @param email email of the restaurant
     * @returns array with product
     */
    async fetchProductArray(email: string): Promise<IProduct[]> {
        return this.restService.fetchProductArray(email).toPromise();
    }
}
