using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AppetiteAPI.ApiModels;
using AppetiteAPI.Services;

namespace AppetiteAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class OrderServiceController : ControllerBase
    {
        private IOrderService _orderService;

        public OrderServiceController(IOrderService orderService)
        {
           _orderService = orderService;
        }

        //[Authorize]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateOrderModel model)
        {
            if (!_orderService.CreateOrder(model))
            {
                return BadRequest(new { message = "Something went Wrong" });
            }
            return Ok();
        }

        //[Authorize]
        [HttpDelete]
        public async Task<IActionResult> Cancel()
        {
            return Ok();
        }

        //[Authorize]
        [HttpGet("UserGetAll")]
        public async Task<IActionResult> UserGetAll([FromQuery] string userEmail)
        {
            var response = _orderService.UserGetAllOrders(userEmail);
            if (!response.Any())
            {
                return BadRequest(new { message = "No Orders found" });
            }
            return Ok();
        }

        //[Authorize]
        [HttpGet("RestaurantGetAll")]
        public async Task<IActionResult> RestaurantGetAll([FromQuery] string restaurantEmail)
        {
            var response = _orderService.RestaurantGetAllOrders(restaurantEmail);
            if (!response.Any())
            {
                return BadRequest(new { message = "No Orders found" });
            }
            return Ok();
        }

        //[Authorize]
        [HttpGet("UserGetUnfinished")]
        public async Task<IActionResult> UserGetUnfinished()
        {
            return Ok();
        }
        //[Authorize]
        [HttpGet("RestaurantGetUnfinished")]
        public async Task<IActionResult> RestaurantGetUnfinished()
        {
            return Ok();
        }


    }
}
