using AppetiteAPI.Models;
using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace AppetiteAPI.ApiModels
{
    public class CreateRestaurantModel
    {
        [Required]
        public string Email { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        public CreateAdressModel Adress { get; set; }
        [Required]
        public string PhoneNumber { get; set; }
        [Required]
        public RestaurantType RestaurantType { get; set; }
        public IFormFile Logo { get; set; }
    }
}