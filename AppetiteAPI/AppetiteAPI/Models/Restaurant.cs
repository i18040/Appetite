using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace AppetiteAPI.Models
{
    public class Restaurant
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public string PhoneNumber { get; set; }
        public Adress Adress { get; set; }
        public RestaurantType RestaurantType { get; set; }
        public List<Product> Menu { get; set; }
        public DateTime OpeningTime { get; set; }
        public DateTime ClosingTime { get; set; }
        public Rating AverageRating { get; set; }
        public double DeliveryCosts { get; set; }
        public string Logo { get; set; }
    }
}