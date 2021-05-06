using System.Collections.Generic;
using AppetiteAPI.ApiModels;
using AppetiteAPI.Models;

namespace AppetiteAPI.Services
{
    public interface IProductService
    {
        public void CreateProduct(CreateProductModel model);
        public bool DoesProductExistAlready(string name, string restaurantEmail);
        public void DeleteProduct(string name, string restaurantEmail);
        public bool IsAuthorized(string name, string restaurantEmail);
        public List<Product> GetMenu(string restaurantEmail);
    }
}