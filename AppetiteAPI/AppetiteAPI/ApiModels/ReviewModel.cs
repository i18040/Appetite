using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AppetiteAPI.Models;

namespace AppetiteAPI.ApiModels
{
    public class ReviewModel
    {
        public ReviewModel(Review review)
        {
            Id = review.Id;
            User = new UserModel(review.User);
            CreationTime = review.CreationTime;
            Text = review.Text;
            Rating = review.Rating;
            Restaurant = new RestaurantModel(review.Restaurant);
        }

        public int Id { get; set; }
        public UserModel User { get; set; }
        public DateTime CreationTime { get; set; }
        public string Text { get; set; }
        public Rating Rating { get; set; }
        public RestaurantModel Restaurant { get; set; }

        //public List<Pic> Pictures { get; set; }
    }
}
