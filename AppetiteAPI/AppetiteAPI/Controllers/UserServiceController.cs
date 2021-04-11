using System.Linq;
using System.Threading.Tasks;
using AppetiteAPI.ApiModels;
using AppetiteAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.JsonWebTokens;

namespace AppetiteAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserServiceController : ControllerBase
    {
        private IUserService _userService;

        public UserServiceController(IUserService userService)
        {
            _userService = userService;
        }
        
        [AllowAnonymous]
        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate([FromBody]AuthenticateModel model)
        {
            var response = _userService.Authenticate(model.Email, model.Password);

            if (response == null)
                return BadRequest(new { message = "Username or password is incorrect" });

            return Ok(response);
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody]CreateUserModel model)
        {
            if (_userService.IsEmailRegisteredAlready(model.Email))
            {
                return Conflict();
            }
            
            _userService.CreateUser(model.Email, model.Password, model.Name);

            return Ok();
        }

        [Authorize]
        [HttpDelete]
        public async Task<IActionResult> Delete([FromBody]DeleteUserModel model)
        {
            var token = HttpContext.Session.GetString("bearer");
            var tokenEmail = new JsonWebTokenHandler().ReadJsonWebToken(token).Claims.ElementAt(0).Value;
            if (model.Email != tokenEmail)
            {
                return new UnauthorizedResult();
            }
            
            _userService.DeleteUser(model.Email);
        
            return Ok();
        }
    }
}