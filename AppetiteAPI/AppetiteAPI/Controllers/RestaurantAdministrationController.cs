using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using AppetiteAPI.Services;
using AppetiteAPI.ApiModels;

namespace AppetiteAPI.Controllers
{
    public class RestaurantAdministrationController
    {
        [ApiController]
        [Route("[controller]")]
        public class UserServiceController: ControllerBase
        {
            private IRestaurantAdministrationService _restaurantAdministrationService;

            public UserServiceController( IRestaurantAdministrationService restaurantAdministrationService )
            {
                _restaurantAdministrationService = restaurantAdministrationService;
            }

            [AllowAnonymous]
            [HttpPost("authenticate")]
            public async Task<IActionResult> Authenticate( [FromBody] AuthenticateModel model )
            {
                var response = _restaurantAdministrationService.Authenticate(model.Email, model.Password);

                if( response == null )
                    return BadRequest(new { message = "E-Mail or password is incorrect" });

                return Ok(response);
            }

            [AllowAnonymous]
            [HttpPost]
            public async Task<IActionResult> Create( [FromBody] CreateRestaurantModel model )
            {
                if( _restaurantAdministrationService.IsEmailRegisteredAlready(model.Email) )
                {
                    return Conflict(new { message = "Email is already taken" });
                }

                _restaurantAdministrationService.CreateRestaurant(model.Name, model.Password, model.Adress, model.Email, model.PhoneNumber, model.RestaurantType);

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
        }
    }
}