using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using AppetiteAPI.ApiModels;
using AppetiteAPI.DataAccess;
using AppetiteAPI.Helpers;
using AppetiteAPI.Models;
using Microsoft.AspNetCore.Http;
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
                CreationTime = DateTime.Now,
                Pictures = new List<string>()
            };
            if (model.Pictures != null)
                foreach (var picture in model.Pictures)
                {
                    string saveName = $"{user.Name}_{restaurant.Name}_{picture.FileName}";
                    SavePicture(picture, saveName);
                    review.Pictures.Add(saveName);
                }

            _dbContext.Reviews.Add(review);
            _dbContext.SaveChanges();
            UpdateAverageRating(restaurant);
            return true;
        }

        public bool ReviewExists(CreateReviewModel model)
        {
            var user = _dbContext.Users.SingleOrDefault(u => u.Email == model.UserEmail);
            var restaurant = _dbContext.Restaurants.SingleOrDefault(u => u.Email == model.RestaurantEmail);
            var reviewCheck = _dbContext.Reviews.SingleOrDefault(u => u.User.Email == user.Email && u.Restaurant.Email == restaurant.Email);
            if (reviewCheck != null)
                return true; //rating from user to this restaurant already exists
            return false;
        }
        public bool ReviewExists(DeleteReviewModel model)
        {
            var user = _dbContext.Users.SingleOrDefault(u => u.Email == model.UserEmail);
            var restaurant = _dbContext.Restaurants.SingleOrDefault(u => u.Email == model.RestaurantEmail);
            var reviewCheck = _dbContext.Reviews.SingleOrDefault(u => u.User.Email == user.Email && u.Restaurant.Email == restaurant.Email);
            if (reviewCheck != null)
                return true; //rating from user to this restaurant already exists
            return false;
        }

        public bool DeleteReview(DeleteReviewModel model)
        {
            var user = _dbContext.Users.SingleOrDefault(u => u.Email == model.UserEmail);
            var restaurant = _dbContext.Restaurants.SingleOrDefault(u => u.Email == model.RestaurantEmail);

            if (user == null || restaurant == null)
            {
                return false;
            }
            var review = _dbContext.Reviews.SingleOrDefault(u => u.User.Email == user.Email && u.Restaurant.Email == restaurant.Email);

            if (review.Pictures != null)
                foreach (var picture in review.Pictures)
                {
                    DeletePicture(picture);
                }

            _dbContext.Reviews.Remove(review);
            _dbContext.SaveChanges();
            UpdateAverageRating(restaurant);
            return true;
        }

        private void UpdateAverageRating(Restaurant restaurant)
        {
            var allRatings = _dbContext.Reviews.Where(r => r.Restaurant.Email == restaurant.Email);
            int tempTotalRating = 0;
            int tempRatingCount = 0;
            Rating averageRating;
            foreach (var rating in allRatings)
            {
                tempRatingCount++;
                tempTotalRating += (int)rating.Rating;
            }
            if (tempRatingCount > 0)
            {
                double tempAverageRating = tempTotalRating / tempRatingCount;

                switch (Math.Round(tempAverageRating, 0))
                {
                    case 1:
                        averageRating = Rating.OneStar;
                        break;
                    case 2:
                        averageRating = Rating.TwoStar;
                        break;
                    case 3:
                        averageRating = Rating.ThreeStar;
                        break;
                    case 4:
                        averageRating = Rating.FourStar;
                        break;
                    case 5:
                        averageRating = Rating.FiveStar;
                        break;
                    default:
                        averageRating = Rating.none;
                        break;
                }
            }
            else
                averageRating = Rating.none;
            restaurant.AverageRating = averageRating;
            _dbContext.Restaurants.Update(restaurant);
            _dbContext.SaveChanges();
        }

        public Rating GetRestaurantAverageRating(RestaurantMailModel model)
        {
            var restaurant = _dbContext.Restaurants.FirstOrDefault(r => r.Email == model.Email);
            if (restaurant != null)
                return restaurant.AverageRating;
            else
                return Rating.none;
        }

        public bool RestaurantExists(RestaurantMailModel model)
        {
            var restaurant = _dbContext.Restaurants.FirstOrDefault(r => r.Email == model.Email);
            if (restaurant != null)
                return true;
            else
                return false;
        }

        public List<ReviewModel> GetUserReviews(string email)
        {
            var reviews = _dbContext.Reviews.Where(r => r.User.Email == email).Include(r => r.User).Include(r => r.Restaurant.Adress).ToList();
            return GetReviewModels(reviews);
        }

        public List<ReviewModel> GetRestaurantReviews(RestaurantMailModel model)
        {
            var reviews = _dbContext.Reviews.Where(r => r.Restaurant.Email == model.Email).Include(r => r.User).Include(r => r.Restaurant.Adress).ToList();
            return GetReviewModels(reviews);
        }

        private List<ReviewModel> GetReviewModels(List<Review> reviews)
        {
            var response = new List<ReviewModel>();
            reviews.ForEach(review => response.Add(new ReviewModel(review)));
            return response;
        }

        private async void SavePicture(IFormFile picture, string saveName)
        {
            string path = Directory.GetCurrentDirectory() + "\\Pictures\\" + saveName; //TODO Filename

            using (Stream stream = new FileStream(path, FileMode.Create))
            {
                await picture.CopyToAsync(stream);
            }
        }

        private async void DeletePicture(string picturePath) //attention: path can be empty
        {
            throw new NotImplementedException(); //ToDo!
        }
    }
}
