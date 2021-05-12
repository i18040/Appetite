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
            Adress = restaurant.Adress;
            RestaurantType = restaurant.RestaurantType;
            Menu = restaurant.Menu;
            OpeningTime = restaurant.OpeningTime;
            ClosingTime = restaurant.ClosingTime;
            Logo = restaurant.Logo;
        }
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public Adress Adress { get; set; }
        public RestaurantType RestaurantType { get; set; }
        public List<Product> Menu { get; set; }
        public DateTime OpeningTime { get; set; }
        public DateTime ClosingTime { get; set; }
        public string Logo { get; set; }
    }
}
