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
        [HttpPost]
        public async Task<IActionResult> FindRestaurant([FromBody] RestaurantFinderModel model)
        {
            var response = _restaurantFinder.GetCloseRestaurants(model);
            if (response == null)
                return BadRequest(new { message = "No Restaurants found" });

            return Ok(response);
        }
    }
}