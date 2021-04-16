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
        List<ReviewModel> GetUserReviews(DeleteUserModel model);
        List<ReviewModel> GetRestaurantReviews(RestaurantMailModel model);
    }
}
