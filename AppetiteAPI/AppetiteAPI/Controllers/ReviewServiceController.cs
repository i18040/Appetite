using System;
using System.Collections.Generic;
using System.Linq;
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
    public class ReviewServiceController : ControllerBase
    {
        private IReviewService _reviewService;

        public ReviewServiceController(IReviewService reviewService)
        {
            _reviewService = reviewService;
        }

        //[Authorize]
        [HttpPost("CreateReview")]
        public async Task<IActionResult> Create([FromBody] CreateReviewModel model)
        {

            if (!_reviewService.CreateReview(model))
            {
                return BadRequest(new { message = "Something went Wrong" });
            }

            return Ok();
        }

        //[Authorize]
        [HttpGet("UserReviews")]
        public async Task<IActionResult> UserReviews()
        {
            var tokenEmail = User.FindFirst(ClaimTypes.Email)?.Value;
            var response = _reviewService.GetUserReviews(tokenEmail);
            if (!response.Any())
            {
                return BadRequest(new { message = "No Reviews found" });
            }

            return Ok(response);
        }

        //[Authorize]
        [HttpGet("RestaurantReviews")]
        public async Task<IActionResult> RestaurantReview([FromQuery] RestaurantMailModel model)
        {
            var response = _reviewService.GetRestaurantReviews(model);
            if (!response.Any())
            {
                return BadRequest(new { message = "No Reviews found" });
            }

            return Ok(response);
        }

    }
}
