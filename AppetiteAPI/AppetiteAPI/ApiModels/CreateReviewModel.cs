using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AppetiteAPI.Models;

namespace AppetiteAPI.ApiModels
{
    public class CreateReviewModel
    {
        public string UserEmail { get; set; }
        public string RestaurantEmail { get; set; }
        public string Text { get; set; }
        public Rating Rating { get; set; }
        //public List<Pic> Pictures { get; set; }
    }
}
