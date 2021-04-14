using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AppetiteAPI.Models;
using GeoCoordinatePortable;

namespace AppetiteAPI.Services
{
    public interface IRestaurantFinder
    {
        List<Restaurant> GetCloseRestaurants(GeoCoordinate location, int distance, RestaurantType type);
    }
}