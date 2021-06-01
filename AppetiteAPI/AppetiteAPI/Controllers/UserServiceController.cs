using System.Linq;
using System.Security.Claims;
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
        [HttpPost("Authenticate")]
        public IActionResult Authenticate([FromBody]AuthenticateModel model)
        {
            var response = _userService.Authenticate(model.Email, model.Password);

            if (response == null)
                return BadRequest(new { message = "Username or password is incorrect" });

            return Ok(response);
        }

        [AllowAnonymous]
        [HttpPost]
        public IActionResult Create([FromBody]CreateUserModel model)
        {
            if (_userService.IsEmailRegisteredAlready(model.Email))
            {
                return Conflict(new { message = "Email is already taken" });
            }
            
            _userService.CreateUser(model.Email, model.Password, model.Name);

            return Ok();
        }

        [Authorize]
        [HttpDelete]
        public IActionResult Delete([FromBody]DeleteUserModel model)
        {
            var tokenEmail = User.FindFirst(ClaimTypes.Email)?.Value;
            if (model.Email != tokenEmail)
            {
                return new UnauthorizedResult();
            }

            if (!_userService.DeleteUser(model.Email))
            {
                return Conflict("Unfinished orders still there");
            }
        
            return Ok();
        }
    }
}