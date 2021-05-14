import { IGeoLocation } from '../geo/geoLocation';

export interface IRestaurant {
  adress: IAddress;
  email: string;
  id: number;
  logo: string;
  menu: string;
  name: string;
  openingTime: string;
  phoneNumber: string;
  category: number;
  reviews: number;
}

export interface IAddress {
  city: string;
  country: string;
  housenumber: string;
  id: number;
  latidude: number;
  longitude: number;
  street: string;
  zipcode: string;
}
