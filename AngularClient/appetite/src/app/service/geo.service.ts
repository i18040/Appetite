import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { IGeoLocation } from '../model/geo/geoLocation';

@Injectable({
  providedIn: 'root',
})
export class GeoService {
  constructor() {}

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
