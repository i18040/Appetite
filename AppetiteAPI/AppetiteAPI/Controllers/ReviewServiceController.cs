using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Security.Claims;
using System.Threading.Tasks;
using AppetiteAPI.ApiModels;
using AppetiteAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
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
        [HttpPost]
        public async Task<IActionResult> Create([FromForm]CreateReviewModel model)
        {
            //model.UserEmail = User.FindFirst(ClaimTypes.Email)?.Value;
            if (_reviewService.ReviewExists(model))
            {
                return BadRequest(new { message = "Rating from this user to this restaurant already exists" });
            }
            if (!_reviewService.CreateReview(model))
            {
                return BadRequest(new { message = "Something went Wrong" });
            }
            return Ok();
        }

        //[Authorize]
        [HttpDelete]
        public async Task<IActionResult> Delete([FromForm] DeleteReviewModel model)
        {
            var tokenEmail = User.FindFirst(ClaimTypes.Email)?.Value;
            if (model.UserEmail != tokenEmail)
            {
                //return new UnauthorizedResult();
            }
            if (!_reviewService.ReviewExists(model))
            {
                return BadRequest(new { message = "Rating from this user to this restaurant doesen't exists" });
            }

            if (!_reviewService.DeleteReview(model))
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

        [AllowAnonymous]
        [HttpGet("RestaurantReviews")]
        public async Task<IActionResult> RestaurantReview([FromQuery] RestaurantMailModel model)
        {
            if (!_reviewService.RestaurantExists(model))
            {
                return BadRequest(new { message = "Restaurant not found" });
            }

            var response = _reviewService.GetRestaurantReviews(model);
            if (!response.Any())
            {
                return BadRequest(new { message = "No Reviews found" });
            }

            return Ok(response);
        }

        [AllowAnonymous]
        [HttpGet("RestaurantAverageRating")]
        public async Task<IActionResult> RestaurantAverageRating([FromQuery] RestaurantMailModel model)
        {
            if (!_reviewService.RestaurantExists(model))
            {
                return BadRequest(new { message = "Restaurant not found" });
            }

            var response = _reviewService.GetRestaurantAverageRating(model);
            if (response == null)
            {
                return BadRequest(new { message = "No average review value found" });
            }

            return Ok(response);
        }
    }
}
