import { Injectable } from '@angular/core';
import { IGeoLocation } from '../model/geo/geoLocation';

@Injectable({
  providedIn: 'root',
})
export class GeoService {
  constructor() {}

  getGeoLocation(): Promise<any> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (resp) => {
          resolve({ lng: resp.coords.longitude, lat: resp.coords.latitude });
        },
        (err) => {
          reject(err);
        }
      );
    });
  }
}
