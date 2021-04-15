using System.Collections.Generic;
using System.Linq;
using AppetiteAPI.ApiModels;
using AppetiteAPI.DataAccess;
using AppetiteAPI.Helpers;
using AppetiteAPI.Models;
using GeoCoordinatePortable;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace AppetiteAPI.Services
{
    public class RestaurantFinder : IRestaurantFinder
    {
        private readonly DatabaseContext _dbContext;
        private readonly AppSettings _appSettings;

        public RestaurantFinder(DatabaseContext dbContext, IOptions<AppSettings> appSettings)
        {
            _dbContext = dbContext;
            _appSettings = appSettings.Value;
        }
        public List<RestaurantModel> GetCloseRestaurants(GeoCoordinate location, int distance, RestaurantType type)
        {
            // Get Restaurants by Filtering
            List<Restaurant> restaurants;
            if (type == RestaurantType.All)
            {
               restaurants = _dbContext.Restaurants.Include(r=>r.Adress).ToList();
            }
            else
            {
               restaurants =  _dbContext.Restaurants.Where(r => r.RestaurantType == type).Include(r => r.Adress).ToList();
            }
            
            //Get Close Restaurants
            List<RestaurantModel> closeRestaurants = new List<RestaurantModel>();
            foreach (var restaurant in restaurants)
            {
                //if (location.GetDistanceTo(new GeoCoordinate(restaurant.Adress.Coordinate.Latitude, restaurant.Adress.Coordinate.Longitude)) <=  distance)
                //{ TODO Add Coordinates in Database
                    closeRestaurants.Add(new RestaurantModel(restaurant));
                //}
            }

            return closeRestaurants;
        }

    }
}