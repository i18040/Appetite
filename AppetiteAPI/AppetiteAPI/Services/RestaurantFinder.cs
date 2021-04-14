using System.Collections.Generic;
using System.Linq;
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
        public List<Restaurant> GetCloseRestaurants(GeoCoordinate location, int distance, RestaurantType type)
        {
            var coordinates = new GeoCoordinate(location.Latitude, location.Longitude);

            IEnumerable<Restaurant> restaurants = new List<Restaurant>();
            //var restaurants = _dbContext.Restaurants.Where(r => r.RestaurantType == type).Include(r => r.Adress);
            //List<Restaurant> closeRestaurants = new List<Restaurant>();

            if (type != RestaurantType.All)
            {
                restaurants = from exampleRestaurant in ExampleRestaurants
                              where exampleRestaurant.RestaurantType == type
                              select exampleRestaurant;
            }
            else
            {
                restaurants = ExampleRestaurants;
            }

            //TODO Fülle restaurants aus Datenbank mit Filterung nach type und deliveryCost

            IEnumerable<Restaurant> closeRestaurants = new List<Restaurant>();
            if (distance == 0)
            {
                return restaurants.ToList();
            }

            closeRestaurants = from restaurant in restaurants
                               where coordinates.GetDistanceTo(new GeoCoordinate(restaurant.Adress.Coordinate.Latitude,
                                   restaurant.Adress.Coordinate.Longitude)) <= distance
                               select restaurant;

            return closeRestaurants.ToList();
        }


        private List<Restaurant> ExampleRestaurants = new List<Restaurant>()
        {
            new Restaurant()
            {
                Id = 1,
                Name = "Restaurant 1",
                Adress = new Adress()
                {
                    Coordinate = new HelpCoordinates(10, 20),
                    City = "Hamburg",
                    Street = "Musterstraße",
                    Zipcode = "1234",
                    Country = "Deutschland",
                    Housenumber = "1"
                },
                PasswordHash = "abc",
                PhoneNumber = "0123456789",
                Menu = new List<Product>(),
                RestaurantType = RestaurantType.Asian,
                Reviews = new List<Review>(),
                //DeliveryCost = 3.00
            },
            new Restaurant()
            {
                Id = 2,
                Name = "Close Restaurant",
                Adress = new Adress()
                {
                    Coordinate = new HelpCoordinates(11, 20),
                    City = "München",
                    Street = "Landsberger Straße",
                    Zipcode = "1235",
                    Country = "Deutschland",
                    Housenumber = "2"
                },
                PasswordHash = "abc",
                PhoneNumber = "0123456787",
                Menu = new List<Product>(),
                RestaurantType = RestaurantType.Italian,
                Reviews = new List<Review>(),
                //DeliveryCost = 5.00
            },
            new Restaurant()
            {
                Id = 3,
                Name = "Restaurant 2",
                Adress = new Adress()
                {
                    Coordinate = new HelpCoordinates(30, 70)
                }
            },
            new Restaurant()
            {
                Id = 4,
                Name = "Restaurant 3",
                Adress = new Adress()
                {
                    Coordinate = new HelpCoordinates(80, 120)
                }
            },
            new Restaurant()
            {
                Id = 5,
                Name = "Restaurant 4",
                Adress = new Adress()
                {
                    Coordinate = new HelpCoordinates(13, 50)
                }
            },
            new Restaurant()
            {
                Id = 6,
                Name = "Restaurant 5",
                Adress = new Adress()
                {
                    Coordinate = new HelpCoordinates(2, 89)
                }
            }
        };
    }
}