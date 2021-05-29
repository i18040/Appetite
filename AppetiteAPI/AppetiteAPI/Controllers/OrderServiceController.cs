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
        public IActionResult Create([FromBody] CreateOrderModel model)
        {
            if (!_orderService.CreateOrder(model))
            {
                return BadRequest(new { message = "Restaurant or product does not exist" });
            }
            return Ok();
        }

        //[Authorize]
        [HttpDelete]
        public IActionResult Cancel([FromBody] CancelOrderModel model)
        {
            if (!_orderService.CancelOrder(model))
            {
                return BadRequest(new { message = "Order already finished or no Order found" });
            }
            return Ok();
        }

        //[Authorize]
        [HttpGet("UserGetAll")]
        public IActionResult UserGetAll([FromQuery] string userEmail)
        {
            var response = _orderService.UserGetAllOrders(userEmail);
            if (!response.Any())
            {
                return BadRequest(new { message = "No Orders found" });
            }
            return Ok(response);
        }

        //[Authorize]
        [HttpGet("RestaurantGetAll")]
        public IActionResult RestaurantGetAll([FromQuery] string restaurantEmail)
        {
            var response = _orderService.RestaurantGetAllOrders(restaurantEmail);
            if (!response.Any())
            {
                return BadRequest(new { message = "No Orders found" });
            }
            return Ok(response);
        }

        //[Authorize]
        [HttpGet("UserGetUnfinished")]
        public IActionResult UserGetUnfinished([FromQuery] string userEmail)
        {
            var response = _orderService.UserGetUnfinishedOrders(userEmail);
            if (!response.Any())
            {
                return BadRequest(new { message = "No Orders found" });
            }
            return Ok(response);
        }

        //[Authorize]
        [HttpGet("RestaurantGetUnfinished")]
        public IActionResult RestaurantGetUnfinished([FromQuery] string restaurantEmail)
        {
            var response = _orderService.RestaurantGetUnfinishedOrders(restaurantEmail);
            if (!response.Any())
            {
                return BadRequest(new { message = "No Orders found" });
            }
            return Ok(response);
        }

        //[Authorize]
        [HttpPatch("FinishOrder")]
        public IActionResult FinishOrder([FromQuery] string restaurantEmail, int orderId)
        {
           var response = _orderService.FinishOrder(restaurantEmail, orderId);
            if (!response)
            {
                return BadRequest(new { message = "No Order found" });
            }
            return Ok();
        }

    }
}
