using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using AppetiteAPI.ApiModels;
using AppetiteAPI.DataAccess;
using AppetiteAPI.Helpers;
using AppetiteAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace AppetiteAPI.Services
{
    public class ProductService : IProductService
    {
        private readonly DatabaseContext _dbContext;
        private PictureHelper _pictureHelper;

        public ProductService(DatabaseContext dbContext)
        {
            _dbContext = dbContext;
            _pictureHelper = new PictureHelper();
        }

        public void CreateProduct(CreateProductModel model)
        {
            var restaurant = _dbContext.Restaurants.FirstOrDefault(r => r.Email == model.RestaurantEmail);

            var newProduct = new Product
            {
                Name = model.Name,
                Description = model.Description,
                Price = model.Price,
                Ingredients = model.Ingredients,
                Pictures = _pictureHelper.SavePictureList(model.Pictures, $"{ model.Name }_{ model.RestaurantEmail }", "Product")
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
            var restaurant = _dbContext.Restaurants.Where(r => r.Email == restaurantEmail)
                .Include(r => r.Menu)
                .FirstOrDefault();
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

        public byte[] GetPicture(string filename)
        {
            try
            {
                return File.ReadAllBytes($"{Directory.GetCurrentDirectory()}/Pictures/Product/{filename}");
            }
            catch (Exception e)
            {
                return null;
            }
        }
    }
}