using System;
using System.Collections.Generic;
using System.Security.Claims;
using AppetiteAPI.ApiModels;
using AppetiteAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using AppetiteAPI.Models;

namespace AppetiteAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RestaurantAdministrationController : ControllerBase
    {
        private IRestaurantAdministrationService _restaurantAdministrationService;

        public RestaurantAdministrationController( IRestaurantAdministrationService restaurantAdministrationService )
        {
            _restaurantAdministrationService = restaurantAdministrationService;
        }

        [AllowAnonymous]
        [HttpPost("Authenticate")]
        public IActionResult Authenticate( [FromBody] AuthenticateModel model )
        {
            var response = _restaurantAdministrationService.Authenticate(model.Email, model.Password);

            if( response == null )
                return BadRequest(new { message = "E-Mail or password is incorrect" });

            return Ok(response);
        }

        [AllowAnonymous]
        [HttpPost]
        public IActionResult Create( [FromForm] CreateRestaurantModel model )
        {
            if( _restaurantAdministrationService.IsEmailRegisteredAlready(model.Email) )
            {
                return Conflict(new { message = "Email is already taken" });
            }

            _restaurantAdministrationService.CreateRestaurant(model);

            return Ok();
        }

        [Authorize]
        [HttpDelete]
        public IActionResult Delete( [FromBody] DeleteRestaurantModel model )
        {
            var tokenEmail = User.FindFirst(ClaimTypes.Email)?.Value;
            if( model.Email != tokenEmail )
            {
                return new UnauthorizedResult();
            }

            var isDeleteSuccessful = _restaurantAdministrationService.DeleteRestaurant(model.Email);
            if (!isDeleteSuccessful)
            {
                return BadRequest("Cant delete restaurant because there are still open orders");
            }

            return Ok();
        }

        [Authorize]
        [HttpGet("Categories")]
        public IActionResult GetCategories()
        {
            var categoryDictionary = new Dictionary<int, string>();
            foreach (var category in Enum.GetValues(typeof(RestaurantType)))
            {
                categoryDictionary.Add((int) category, category.ToString());
            }

            var categories = new RestaurantCategories
            {
                Categories = categoryDictionary
            };

            return Ok(categories);
        }

        [Authorize]
        [HttpPatch("DeliveryCosts")]
        public IActionResult SetDeliveryCost( [FromBody] DeliveryCosts model )
        {
            var tokenEmail = User.FindFirst(ClaimTypes.Email)?.Value;
            if( model.Email != tokenEmail )
            {
                return new UnauthorizedResult();
            }

            _restaurantAdministrationService.SetDeliveryCosts(model.Email, model.Costs);

            return Ok();
        }
    }
}
