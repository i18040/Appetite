using AppetiteAPI.Models;
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
        public Adress Adress { get; set; }
        [Required]
        public string PhoneNumber { get; set; }
        [Required]
        public RestaurantType RestaurantType { get; set; }
    }
}