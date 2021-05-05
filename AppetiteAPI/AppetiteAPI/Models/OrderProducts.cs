using System.Collections.Generic;

namespace AppetiteAPI.Models
{
    public class OrderProducts
    {
        public int Id { get; set; }
        public List<Product> Products { get; set; }
    }
}