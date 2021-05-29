using System.Net.Http;
using System.Security.Claims;
using System.Threading.Tasks;
using AppetiteAPI.ApiModels;
using AppetiteAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AppetiteAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductServiceController : ControllerBase
    {
        private readonly IProductService _productService;
        private readonly IRestaurantAdministrationService _restaurantAdministrationService;

        public ProductServiceController(IProductService productService, IRestaurantAdministrationService restaurantAdministrationService)
        {
            _productService = productService;
            _restaurantAdministrationService = restaurantAdministrationService;
        }
        
        //[Authorize]
        [HttpPost]
        public IActionResult Create([FromForm] CreateProductModel model)
        {
            if (_productService.DoesProductExistAlready(model.Name, model.RestaurantEmail))
            {
                return Conflict("Product with the same name exists already");
            }
            
            _productService.CreateProduct(model);

            return Ok();
        }

        //[Authorize]
        [HttpDelete]
        public IActionResult Delete([FromBody] DeleteProductModel model)
        {
            var tokenEmail = User.FindFirst(ClaimTypes.Email)?.Value;
            
            if (!_productService.IsAuthorized(model.Name, tokenEmail))
            {
                return Unauthorized("Not authorized for this action");
            }
            
            _productService.DeleteProduct(model.Name, tokenEmail);
            return Ok();
        }

        //[Authorize]
        [HttpGet]
        public IActionResult GetMenu([FromQuery] RestaurantMailModel model)
        {
            return Ok(_productService.GetMenu(model.Email));
        }
        
        //[Authorize]
        [HttpGet("Picture")]
        public IActionResult GetPicture([FromQuery] string picturePath)
        {
            var pictureContent = _productService.GetPicture(picturePath);
            return new FileContentResult(pictureContent, "application/octet-stream")
                {FileDownloadName = picturePath};
        }
    }
}