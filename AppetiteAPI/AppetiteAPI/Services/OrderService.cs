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

            var order = new Order
            {
                Restaurant = restaurant,
                User = user,
                DeliveryCost = model.DeliveryCost,
                Products = new List<Product>()
            };
            foreach (var productName in model.Products) // How save Products in Database Order? 
            {
                order.Products.Add(_dbContext.Products.FirstOrDefault(p => p.Name == productName)); //RestaurantCheck?, Products with same name?
            }

            _dbContext.Orders.Add(order);
            _dbContext.SaveChanges();
            return true;
        }

        public bool CancelOrder()
        {
            throw new NotImplementedException();
        }

        public List<Order> UserGetAllOrders(string userEmail)
        {
            return _dbContext.Orders.Where(o => o.User.Email == userEmail)
                .Include(o => o.Products).Include(o => o.User).Include(o => o.Restaurant).ToList();
        }

        public List<Order> RestaurantGetAllOrders(string restaurantEmail)
        {
            return _dbContext.Orders.Where(o => o.Restaurant.Email == restaurantEmail)
                .Include(o => o.Products).Include(o => o.User).Include(o => o.Restaurant).ToList();
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
