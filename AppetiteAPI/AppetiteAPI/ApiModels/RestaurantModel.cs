using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AppetiteAPI.Models;
using Microsoft.AspNetCore.Http;

namespace AppetiteAPI.ApiModels
{
    public class RestaurantModel
    {
        public RestaurantModel(Restaurant restaurant)
        {
            Id = restaurant.Id;
            Name = restaurant.Name;
            Email = restaurant.Email;
            PhoneNumber = restaurant.PhoneNumber;
            if (restaurant.Adress != null)
            {
                Adress = new AdressModel(restaurant.Adress);
            }
            RestaurantType = restaurant.RestaurantType;
            OpeningTime = restaurant.OpeningTime;
            ClosingTime = restaurant.ClosingTime;
            Logo = restaurant.Logo;
            AverageRating = restaurant.AverageRating;
        }
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public AdressModel Adress { get; set; }
        public RestaurantType RestaurantType { get; set; }
        public DateTime OpeningTime { get; set; }
        public DateTime ClosingTime { get; set; }
        public string Logo { get; set; }
        public Rating AverageRating { get; set; }
    }
}
