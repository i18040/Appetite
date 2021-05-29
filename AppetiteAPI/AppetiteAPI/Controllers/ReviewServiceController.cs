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
        private readonly IReviewService _reviewService;

        public ReviewServiceController(IReviewService reviewService)
        {
            _reviewService = reviewService;
        }

        [Authorize]
        [HttpPost]
        public IActionResult Create([FromForm]CreateReviewModel model)
        {
            if (User.FindFirst(ClaimTypes.Email)?.Value != model.UserEmail)
            {
                return Unauthorized("Invalid user email");
            }
            
            if (_reviewService.ReviewExists(model))
            {
                return BadRequest(new { message = "Rating from this user to this restaurant already exists or restaurant does not exist." });
            }
            if (!_reviewService.CreateReview(model))
            {
                return BadRequest(new { message = "Something went Wrong" });
            }
            return Ok();
        }

        [Authorize]
        [HttpDelete]
        public IActionResult Delete([FromBody] DeleteReviewModel model)
        {
            var tokenEmail = User.FindFirst(ClaimTypes.Email)?.Value;
            if (model.UserEmail != tokenEmail)
            {
                return new UnauthorizedResult();
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

        [Authorize]
        [HttpGet("UserReviews")]
        public IActionResult UserReviews()
        {
            var tokenEmail = User.FindFirst(ClaimTypes.Email)?.Value;
            var reviews = _reviewService.GetUserReviews(tokenEmail);
            if (!reviews.Any())
            {
                return NotFound(new { message = "No Reviews found" });
            }
            
            var response = new List<ReviewReturnModel>();
            foreach (var review in reviews)
            {
                response.Add(new ReviewReturnModel
                {
                    Username = review.User.Name,
                    CreationTime = review.CreationTime,
                    Rating = review.Rating,
                    Text = review.Text
                });
            }
            
            return Ok(response);
        }

        [Authorize]
        [HttpGet("RestaurantReviews")]
        public IActionResult RestaurantReview([FromQuery] RestaurantMailModel model)
        {
            if (!_reviewService.RestaurantExists(model))
            {
                return BadRequest(new { message = "Restaurant not found" });
            }

            var reviews = _reviewService.GetRestaurantReviews(model);
            if (!reviews.Any())
            {
                return BadRequest(new { message = "No Reviews found" });
            }

            var response = new List<ReviewReturnModel>(); // TODO put this in service class
            foreach (var review in reviews)
            {
                response.Add(new ReviewReturnModel
                {
                    Username = review.User.Name,
                    CreationTime = review.CreationTime,
                    Rating = review.Rating,
                    Text = review.Text,
                    Pictures = review.Pictures
                });
            }

            return Ok(response);
        }

        [Authorize]
        [HttpGet("RestaurantAverageRating")]
        public IActionResult RestaurantAverageRating([FromQuery] RestaurantMailModel model)
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

        [Authorize]
        [HttpGet("Picture")]
        public IActionResult GetPicture([FromQuery] string picturePath)
        {
            var pictureContent = _reviewService.GetPicture(picturePath);
            return new FileContentResult(pictureContent, "application/octet-stream")
                {FileDownloadName = picturePath};
        }
    }
}
