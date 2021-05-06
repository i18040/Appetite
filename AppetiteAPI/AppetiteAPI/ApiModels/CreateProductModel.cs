using Microsoft.AspNetCore.Http;
using System.Collections.Generic;

namespace AppetiteAPI.ApiModels
{
    public class CreateProductModel
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public double Price { get; set; }
        public List<string> Ingredients { get; set; }
        public string RestaurantEmail { get; set; }
        public List<IFormFile> Pictures { get; set; }
    }
}