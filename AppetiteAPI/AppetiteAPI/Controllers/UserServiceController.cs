using System.Threading.Tasks;
using AppetiteAPI.ApiModels;
using AppetiteAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

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
            var user = _userService.Authenticate(model.Email, model.Password);

            if (user == null)
                return BadRequest(new { message = "Username or password is incorrect" });

            return Ok(user);
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody]CreateUserModel model)
        {
            _userService.CreateUser(model.Email, model.Password, model.Name);

            return Ok();
        }

        // [HttpDelete]
        // public async Task<IActionResult> Delete([FromBody]DeleteUserModel model)
        // {
        //     _userService.DeleteUser(model.Email);
        //
        //     return Ok();
        // }
    }
}