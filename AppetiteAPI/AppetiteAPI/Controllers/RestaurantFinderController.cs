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
        public IActionResult FindRestaurant([FromBody] RestaurantFinderModel model)
        {
            var response = _restaurantFinder.GetCloseRestaurants(model);
            if (response == null)
                return BadRequest(new { message = "No Restaurants found" });

            return Ok(response);
        }
        
        //[Authorize]
        [HttpGet("Logo")]
        public IActionResult GetLogo([FromQuery] string picturePath)
        {
            var pictureContent = _restaurantFinder.GetLogo(picturePath);
            if (pictureContent != null)
            {
                return new FileContentResult(pictureContent, "application/octet-stream")
                    { FileDownloadName = picturePath };
            }

            return BadRequest("Picture not found");
        }
    }
}