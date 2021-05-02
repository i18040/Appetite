using System.Collections.Generic;
using System.Linq;
using AppetiteAPI.DataAccess;
using AppetiteAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace AppetiteAPI.Services
{
    public class ProductService : IProductService
    {
        private readonly DatabaseContext _dbContext;

        public ProductService(DatabaseContext dbContext)
        {
            _dbContext = dbContext;
        }
        
        public void CreateProduct(string name, string description, double price, List<string> ingredients, string restaurantEmail)
        {
            var restaurant = _dbContext.Restaurants.FirstOrDefault(r => r.Email == restaurantEmail);

            var newProduct = new Product
            {
                Name = name,
                Description = description,
                Price = price,
                Ingredients = ingredients
            };

            if (restaurant.Menu == null)
            {
                restaurant.Menu = new List<Product>();
            }
            restaurant.Menu.Add(newProduct);

            _dbContext.Restaurants.Update(restaurant);
            _dbContext.SaveChanges();
        }

        public bool DoesProductExistAlready(string name, string restaurantEmail)
        {
            var restaurant = _dbContext.Restaurants.FirstOrDefault(r => r.Email == restaurantEmail);
            if (restaurant.Menu == null)
            {
                restaurant.Menu = new List<Product>();
            }

            return restaurant.Menu.Any(p => p.Name == name);
        }

        public void DeleteProduct(string name, string restaurantEmail)
        {
            var restaurant = _dbContext.Restaurants.FirstOrDefault(r => r.Email == restaurantEmail);
            var product = restaurant.Menu.FirstOrDefault(p => p.Name == name);
            restaurant.Menu.Remove(product);

            _dbContext.Restaurants.Update(restaurant);
            _dbContext.SaveChanges();
        }

        public bool IsAuthorized(string name, string restaurantEmail)
        {
            var restaurant = _dbContext.Restaurants.FirstOrDefault(r => r.Email == restaurantEmail);

            return restaurant.Menu.Any(p => p.Name == name);
        }

        public List<Product> GetMenu(string restaurantEmail)
        {
            var restaurant = _dbContext.Restaurants.Include(r => r.Menu)
                .FirstOrDefault(r => r.Email == restaurantEmail);

            return restaurant.Menu;
        }
    }
}