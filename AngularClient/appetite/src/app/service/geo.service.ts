import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class GeoService {
    constructor() { }


    /**
     * fetches location of the user
     * @returns Geographical location with latitude und longitude
     */
    async getGeoLocation(): Promise<any> {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                (resp) => {
                    resolve({ lng: resp.coords.longitude, lat: resp.coords.latitude });
                },
                (err) => {
                    throwError(err);
                    //   reject(err);
                }
            );
        });
    }
}
