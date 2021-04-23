import { IGeoLocation } from '../geo/geoLocation';

export interface IRestaurant {
  id: number;
  name: string;
  category: number;
  reviews: number;
  location: IGeoLocation;
}
