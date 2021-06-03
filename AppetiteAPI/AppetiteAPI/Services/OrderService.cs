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
                OrderReceivedTime = DateTime.Now,
                IsDone = false
            };
            
            _dbContext.Orders.Add(newOrder);
            _dbContext.SaveChanges();
            return true;
        }

        private double CalculateCost(List<Product> products, Restaurant restaurant)
        {
            double cost = 0;
            foreach (var product in products)
            {
                cost += product.Price;
            }

            cost += restaurant.DeliveryCosts;
            return cost;
        }

        public bool CancelOrder(CancelOrderModel model)
        {
            var user = _dbContext.Users.SingleOrDefault(u => u.Email.Equals(model.UserEmail));
            var order = _dbContext.Orders.SingleOrDefault(o => o.Id == model.OrderId && o.User == user);
            if (order == null || order.IsDone)
            {
                return false;
            }
            _dbContext.Orders.Remove(order);
            _dbContext.SaveChanges();
            return true;
        }

        public List<OrderModel> UserGetAllOrders(string userEmail)
        {
            var result =_dbContext.Orders.Where(o => o.User.Email == userEmail)
                .Select(o => new Order
                {
                    Restaurant = o.Restaurant,
                    User = o.User,
                    DeliveryCost = o.DeliveryCost,
                    Id = o.Id,
                    IsDone = o.IsDone,
                    OrderReceivedTime = o.OrderReceivedTime,
                    Products = o.Products.Select(p => new Product
                    {
                        Description = p.Description,
                        Id = p.Id,
                        Ingredients = p.Ingredients,
                        Name = p.Name
                    }).ToList()
                })
                .ToList();
            var orders = new List<OrderModel>();
            foreach (var order in result)
            {
                orders.Add(new OrderModel(order));
            }
            return orders;
        }

        public List<OrderModel> RestaurantGetAllOrders(string restaurantEmail)
        {
            var result = _dbContext.Orders.Where(o => o.Restaurant.Email == restaurantEmail)
                .Select(o => new Order
                {
                    Restaurant = o.Restaurant,
                    User = o.User,
                    DeliveryCost = o.DeliveryCost,
                    Id = o.Id,
                    IsDone = o.IsDone,
                    OrderReceivedTime = o.OrderReceivedTime,
                    Products = o.Products.Select(p => new Product
                    {
                        Description = p.Description,
                        Id = p.Id,
                        Ingredients = p.Ingredients,
                        Name = p.Name
                    }).ToList()
                })
                .ToList();
            var orders = new List<OrderModel>();
            foreach (var order in result)
            {
                orders.Add(new OrderModel(order));
            }
            return orders;
        }
        public List<OrderModel> UserGetUnfinishedOrders(string userEmail)
        {
            var result = _dbContext.Orders.Where(o => o.User.Email == userEmail && !o.IsDone)
                .Select(o => new Order
                {
                    Restaurant = o.Restaurant,
                    User = o.User,
                    DeliveryCost = o.DeliveryCost,
                    Id = o.Id,
                    IsDone = o.IsDone,
                    OrderReceivedTime = o.OrderReceivedTime,
                    Products = o.Products.Select(p=> new Product
                    {
                        Description = p.Description,
                        Id = p.Id,
                        Ingredients = p.Ingredients,
                        Name = p.Name
                    }).ToList()
                })
                .ToList();
            var orders = new List<OrderModel>();
            foreach (var order in result)
            {
                orders.Add(new OrderModel(order));
            }
            return orders;
        }

        public List<OrderModel> RestaurantGetUnfinishedOrders(string restaurantEmail)
        {
            var result = _dbContext.Orders.Where(o => o.Restaurant.Email == restaurantEmail && !o.IsDone)
                .Select(o => new Order
                {
                    Restaurant = o.Restaurant,
                    User = o.User,
                    DeliveryCost = o.DeliveryCost,
                    Id = o.Id,
                    IsDone = o.IsDone,
                    OrderReceivedTime = o.OrderReceivedTime,
                    Products = o.Products.Select(p => new Product
                    {
                        Description = p.Description,
                        Id = p.Id,
                        Ingredients = p.Ingredients,
                        Name = p.Name
                    }).ToList()
                })
                .ToList();
            var orders = new List<OrderModel>();
            foreach (var order in result)
            {
                orders.Add(new OrderModel(order));
            }
            return orders;
        }

        public bool FinishOrder(string restaurantEmail, int orderId)
        {
            var order = _dbContext.Orders.SingleOrDefault(o => o.Id == orderId);
            if (order == null)
            {
                return false;
            }
            order.IsDone = true;
            _dbContext.SaveChanges();
            return true;
        }
    }
}
