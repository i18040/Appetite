using System;
using System.Collections.Generic;
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
        public async Task<IActionResult> Authenticate( [FromBody] AuthenticateModel model )
        {
            var response = _restaurantAdministrationService.Authenticate(model.Email, model.Password);

            if( response == null )
                return BadRequest(new { message = "E-Mail or password is incorrect" });

            return Ok(response);
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> Create( [FromForm] CreateRestaurantModel model )
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
        public async Task<IActionResult> Delete( [FromBody] DeleteRestaurantModel model )
        {
            var tokenEmail = User.Identity.Name;
            if( model.Email != tokenEmail )
            {
                return new UnauthorizedResult();
            }

            _restaurantAdministrationService.DeleteRestaurant(model.Email);

            return Ok();
        }

        //[Authorize]
        [HttpGet("Categories")]
        public async Task<IActionResult> GetCategories()
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
    }
}
