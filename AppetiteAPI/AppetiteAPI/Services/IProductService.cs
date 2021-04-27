using System.Collections.Generic;
using AppetiteAPI.Models;

namespace AppetiteAPI.Services
{
    public interface IProductService
    {
        public void CreateProduct(string name, string description, double price, List<string> ingredients, string restaurantEmail);
        public bool DoesProductExistAlready(string name, string restaurantEmail);
        public void DeleteProduct(string name, string restaurantEmail);
        public bool IsAuthorized(string name, string restaurantEmail);
        public List<Product> GetMenu(string restaurantEmail);
    }
}