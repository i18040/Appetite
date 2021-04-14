using System.Collections.Generic;
using AppetiteAPI.Models;
using AppetiteAPI.Services;
using GeoCoordinatePortable;
using Microsoft.AspNetCore.Mvc;

namespace AppetiteAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RestaurantFinderController : ControllerBase
    {
        private IRestaurantFinder _restaurantFinder;

        public RestaurantFinderController(IRestaurantFinder restaurantFinder)
        {
            _restaurantFinder = restaurantFinder;
        }
        [HttpGet("location")]
        public IEnumerable<Restaurant> Get([FromQuery] HelpCoordinates location, [FromQuery] int distance, [FromQuery] RestaurantType type)
        {
            return _restaurantFinder.GetCloseRestaurants(new GeoCoordinate(location.Latitude, location.Longitude), distance, type);
        }
    }
}