export interface IRestaurantFinder {
  coordinate: {
    latitude: number;
    longitude: number;
  };
  distance: number;
  type: number;
}
