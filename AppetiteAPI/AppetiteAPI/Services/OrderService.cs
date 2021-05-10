using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AppetiteAPI.ApiModels;
using AppetiteAPI.DataAccess;
using AppetiteAPI.Helpers;
using AppetiteAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace AppetiteAPI.Services
{
    public class OrderService : IOrderService
    {
        private readonly DatabaseContext _dbContext;
        private readonly AppSettings _appSettings;

        public OrderService(DatabaseContext dbContext, IOptions<AppSettings> appSettings)
        {
            _dbContext = dbContext;
            _appSettings = appSettings.Value;
        }
        public bool CreateOrder(CreateOrderModel model)
        {
            var restaurant = _dbContext.Restaurants.Include(r => r.Menu)
                .FirstOrDefault(r => r.Email == model.RestaurantEmail);

            var user = _dbContext.Users.FirstOrDefault(u => u.Email == model.UserEmail);

            if (restaurant == null || user == null)
            {
                return false;
            }
            
            var products = new List<Product>();
            foreach (var product in model.Products)
            {
                if (restaurant.Menu.All(p => p.Name != product.Name))
                {
                    return false;
                }
                products.Add(restaurant.Menu.FirstOrDefault(p => p.Name == product.Name));
            }

            var newOrder = new Order
            {
                Restaurant = restaurant,
                User = user,
                Products = products,
                DeliveryCost = CalculateCost(products, restaurant),
                OrderReceivedTime = DateTime.Now
            };
            
            _dbContext.Orders.Add(newOrder);
            _dbContext.SaveChanges();
            return true;
        }

        private double CalculateCost(List<Product> products, Restaurant restaurant)
        {
            return 10; //TODO implement
        }

        public bool CancelOrder()
        {
            throw new NotImplementedException();
        }

        public List<Order> UserGetAllOrders(string userEmail)
        {
            return _dbContext.Orders.Where(o => o.User.Email == userEmail)
                .Include(o => o.User)
                .Include(o => o.Restaurant)
                .ToList();
        }

        public List<Order> RestaurantGetAllOrders(string restaurantEmail)
        {
            return _dbContext.Orders.Where(o => o.Restaurant.Email == restaurantEmail)
                .Include(o => o.Restaurant)
                .Include(o => o.User)
                .ToList();
        }
        public List<Order> UserGetUnfinishedOrders(string userEmail)
        {
            throw new NotImplementedException();
        }

        public List<Order> RestaurantGetUnfinishedOrders(string restaurantEmail)
        {
            throw new NotImplementedException();
        }
    }
}
