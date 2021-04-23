export interface ICategory {
    id:             number;
    name:           string;
    description:    string;
}

export interface IRestaurant {
    id:             number;
    name:           string;
    category:       number;
    reviews:        number;
    location:       IGeoLocation;
}

export interface IGeoLocation{
    latitude:      number;
    longitude:     number;
}