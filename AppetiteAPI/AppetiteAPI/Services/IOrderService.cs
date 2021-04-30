using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AppetiteAPI.ApiModels;
using AppetiteAPI.Models;

namespace AppetiteAPI.Services
{
    public interface IOrderService
    {
        public bool CreateOrder(CreateOrderModel model);
        public bool CancelOrder();
        public List<Order> UserGetAllOrders(string userEmail);
        public List<Order> RestaurantGetAllOrders(string restaurantEmail);
        public List<Order> UserGetUnfinishedOrders(string userEmail);
        public List<Order> RestaurantGetUnfinishedOrders(string restaurantEmail);
        
    }
}
