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
            var user = _dbContext.Users.SingleOrDefault(u => u.Email == model.UserEmail);
            var restaurant = _dbContext.Restaurants.SingleOrDefault(u => u.Email == model.RestaurantEmail);

            if (user == null || restaurant == null)
            {
                return false;
            }

            var products = new List<Product>();
            foreach (var product in model.OrderProducts.Products)
            {
                products.Add(_dbContext.Products.SingleOrDefault(p => p.Name == product.Name && restaurant.Email == model.RestaurantEmail));
            }

            var orderProduct = new OrderProducts
            {
                Products = products
            };

            var order = new Order
            {
                Restaurant = restaurant,
                User = user,
                DeliveryCost = CalculateCost(model.OrderProducts.Products, restaurant),
                OrderProducts = orderProduct,
                OrderReceivedTime = DateTime.Now
            };

            _dbContext.Orders.Add(order);
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
                .Include(o => o.OrderProducts).Include(o => o.User).Include(o => o.Restaurant).ToList();
        }

        public List<Order> RestaurantGetAllOrders(string restaurantEmail)
        {
            return _dbContext.Orders.Where(o => o.Restaurant.Email == restaurantEmail)
                .Include(o => o.OrderProducts).Include(o => o.User).Include(o => o.Restaurant).ToList();
        }
        public List<Order> UserGetUnfinishedOrders(string userEmail)
        {
            throw new NotImplementedException();
        }

        public List<Order> RestaurantGetUnfinishedOrders(string restaurantEmail)
        {
            throw new NotImplementedException();
        }


        #region HelpMethods

        public bool CheckOrderExists()
        {
            return true;
        }
        #endregion

    }
}
