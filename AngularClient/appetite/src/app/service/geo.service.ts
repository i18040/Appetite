import { Injectable } from '@angular/core';
import { IGeoLocation } from '../model/geo/geoLocation';

@Injectable({
  providedIn: 'root',
})
export class GeoService {
  constructor() {}

  getGeoLocation(): IGeoLocation {
    var geoLoc: IGeoLocation = { latitude: 20000, longitude: 20000 };
    return geoLoc;
  }
}
