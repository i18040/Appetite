using System.Collections.Generic;
using System.Threading.Tasks;
using AppetiteAPI.ApiModels;
using AppetiteAPI.Models;
using AppetiteAPI.Services;
using GeoCoordinatePortable;
using Microsoft.AspNetCore.Authorization;
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

        //[Authorize]
        [HttpPost("location")]
        public async Task<IActionResult> Get([FromBody] RestaurantFinderModel model)
        {
            var response = _restaurantFinder.GetCloseRestaurants(new GeoCoordinate(model.Coordinate.Latitude, model.Coordinate.Longitude), model.Distance, model.Type);

            return Ok(response);
        }
    }
}