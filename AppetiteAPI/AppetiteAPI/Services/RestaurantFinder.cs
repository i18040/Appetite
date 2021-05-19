using System.Collections.Generic;
using System.IO;
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
        public List<RestaurantModel> GetCloseRestaurants(RestaurantFinderModel model)
        {
            //Get Restaurants by Filtering
            List<Restaurant> restaurants;
            if (model.Type == RestaurantType.All)
            {
                restaurants = _dbContext.Restaurants.Include(r => r.Adress).ToList();
            }
            else
            {
                restaurants = _dbContext.Restaurants.Where(r => r.RestaurantType == model.Type).Include(r => r.Adress).ToList();
            }

            //Get Close Restaurants
            List<RestaurantModel> closeRestaurants = new List<RestaurantModel>();
            foreach (var restaurant in restaurants)
            {
                if (new GeoCoordinate(model.Coordinate.Latitude, model.Coordinate.Longitude).GetDistanceTo(new GeoCoordinate(restaurant.Adress.Latidute, restaurant.Adress.Longitude)) <= model.Distance)
                {
                    //TODO Add Coordinates in Database
                    closeRestaurants.Add(new RestaurantModel(restaurant));
                }
            }

            return closeRestaurants;
        }

        public byte[] GetLogo(string filename)
        {
            return File.ReadAllBytes($"{Directory.GetCurrentDirectory()}/Pictures/Logo/{filename}");
        }
    }
}