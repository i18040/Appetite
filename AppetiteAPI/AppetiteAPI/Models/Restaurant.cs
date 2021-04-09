using System;
using System.Collections.Generic;

namespace AppetiteAPI.Models
{
    public class Restaurant
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string PasswordHash { get; set; }
        public string PhoneNumber { get; set; }
        public Adress Adress { get; set; }
        public RestaurantType RestaurantType { get; set; }
        public List<Product> Menu { get; set; }
        public List<Review> Reviews { get; set; }
        public DateTime OpeningTime { get; set; }
        public DateTime ClosingTime { get; set; }
    }
}