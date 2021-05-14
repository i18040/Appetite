import { Injectable } from '@angular/core';
import { IMenu } from '../model/orderProcess/menu';
import { RestServiceService } from './rest-service.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private restService: RestServiceService) {}

  /**
   * fetches the menu of a restaurant
   * @param email email of the restaurant
   * @returns array with menu
   */
  async fetchMenuArray(email: string): Promise<IMenu[]> {
    return this.restService.fetchMenuArray(email).toPromise();
  }
}
