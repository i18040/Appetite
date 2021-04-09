using System.Collections.Generic;

namespace AppetiteAPI.Models
{
    public class Order
    {
        public int Id { get; set; }
        public User User { get; set; }
        public Restaurant Restaurant { get; set; }
        public List<Product> Products { get; set; }
        public double DeliveryCost { get; set; }
    }
}