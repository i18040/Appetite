using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AppetiteAPI.ApiModels;
using AppetiteAPI.Models;

namespace AppetiteAPI.Services
{
    public interface IReviewService
    {
        bool CreateReview(CreateReviewModel model);
        bool DeleteReview(DeleteReviewModel model);
        List<ReviewModel> GetUserReviews(string email);
        List<ReviewModel> GetRestaurantReviews(RestaurantMailModel model);
        Rating GetRestaurantAverageRating(RestaurantMailModel model);
        bool RestaurantExists(RestaurantMailModel model);
    }
}
