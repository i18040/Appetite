using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AppetiteAPI.Models;

namespace AppetiteAPI.ApiModels
{
    public class OrderModel
    {
        public OrderModel(Order order)
        {
            Id = order.Id;
            User = new UserModel(order.User);
            Restaurant = new RestaurantModel(order.Restaurant);
            DeliveryCost = order.DeliveryCost;
            OrderReceivedTime = order.OrderReceivedTime;
            Products = order.Products;
            IsDone = order.IsDone;
        }
        public int Id { get; set; }
        public UserModel User { get; set; }
        public RestaurantModel Restaurant { get; set; }
        public double DeliveryCost { get; set; }
        public DateTime OrderReceivedTime { get; set; }
        public List<Product> Products { get; set; }
        public bool IsDone { get; set; }
    }
}
