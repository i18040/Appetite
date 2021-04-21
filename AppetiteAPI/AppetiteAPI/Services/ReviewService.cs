using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AppetiteAPI.ApiModels;
using AppetiteAPI.DataAccess;
using AppetiteAPI.Helpers;
using AppetiteAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace AppetiteAPI.Services
{
    public class ReviewService : IReviewService
    {
        private readonly DatabaseContext _dbContext;
        private readonly AppSettings _appSettings;

        public ReviewService(DatabaseContext dbContext, IOptions<AppSettings> appSettings)
        {
            _dbContext = dbContext;
            _appSettings = appSettings.Value;
        }
        public bool CreateReview(CreateReviewModel model)
        {
            var user = _dbContext.Users.SingleOrDefault(u => u.Email == model.UserEmail);
            var restaurant = _dbContext.Restaurants.SingleOrDefault(u => u.Email == model.RestaurantEmail);

            if (user == null || restaurant == null)
            {
                return false;
            }
            var review = new Review
            {
                User = user,
                Restaurant = restaurant,
                Text = model.Text,
                Rating = model.Rating,
                CreationTime = DateTime.Now
            };

            _dbContext.Reviews.Add(review);
            _dbContext.SaveChanges();
            return true;
        }
        public List<ReviewModel> GetUserReviews(string email)
        {
            var reviews = _dbContext.Reviews.Where(r => r.User.Email == email).Include(r => r.User).ToList(); //.Include(r=> r.Restaurant);
            return GetReviewModels(reviews);
        }

        public List<ReviewModel> GetRestaurantReviews(RestaurantMailModel model)
        {
            var reviews = _dbContext.Reviews.Where(r => r.Restaurant.Email == model.Email).Include(r => r.User).ToList(); //.Include(r => r.Restaurant);
            return GetReviewModels(reviews);
        }

        private List<ReviewModel> GetReviewModels(List<Review> reviews)
        {
            var response = new List<ReviewModel>();
            reviews.ForEach(review => response.Add(new ReviewModel(review)));
            return response;
        }

    }
}
