using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AppetiteAPI.ApiModels;
using AppetiteAPI.Models;
using GeoCoordinatePortable;

namespace AppetiteAPI.Services
{
    public interface IRestaurantFinder
    {
        List<RestaurantModel> GetCloseRestaurants(RestaurantFinderModel model);
        byte[] GetLogo(string filename);
    }
}