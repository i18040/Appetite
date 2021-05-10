using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AppetiteAPI.Models;

namespace AppetiteAPI.ApiModels
{
    public class CreateOrderModel
    {
        public string UserEmail { get; set; }
        public string RestaurantEmail { get; set; }
        public List<Product> Products { get; set; }
    }
}
