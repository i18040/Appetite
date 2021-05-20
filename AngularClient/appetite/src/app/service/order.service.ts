import { Injectable } from '@angular/core';
import { getMatIconFailedToSanitizeUrlError } from '@angular/material/icon';
import { WebcamImage } from 'ngx-webcam';
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

    sendReview(description: string, rating: number, image: WebcamImage) {
        // const pic: Blob = convertImg(image);
        console.log(image);
        const reviewObj: IReview = {
            userEmail: this.sessUser.email,
            restaurantEmail: this.selectedOrder.restaurant.email,
            text: description,
            rating: rating,
            pictures: [image.imageData],
        }
        // return this.restService.sendReview(reviewObj).toPromise();
    }

    /* Method to convert Base64Data Url as Image Blob */
    //     convertImg(image: Object): Blob {
    //         return Observable.create((observer: Observer<Blob>) => {
    //             const byteString: string = window.atob(image.);
    //             const arrayBuffer: ArrayBuffer = new ArrayBuffer(byteString.length);
    //             const int8Array: Uint8Array = new Uint8Array(arrayBuffer);
    //             for (let i = 0; i < byteString.length; i++) {
    //               int8Array[i] = byteString.charCodeAt(i);
    //             }
    //             const blob = new Blob([int8Array], { type: "image/jpeg" });
    //             observer.next(blob);
    //             observer.complete();
    //           });
    //     }

    //   dataURItoBlob(dataURI: string): Observable<Blob> {

    //   }

}