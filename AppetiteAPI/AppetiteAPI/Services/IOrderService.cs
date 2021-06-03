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
        public bool CancelOrder(CancelOrderModel model);
        public List<OrderModel> UserGetAllOrders(string userEmail);
        public List<OrderModel> RestaurantGetAllOrders(string restaurantEmail);
        public List<OrderModel> UserGetUnfinishedOrders(string userEmail);
        public List<OrderModel> RestaurantGetUnfinishedOrders(string restaurantEmail);
        public bool FinishOrder(string restaurantEmail, int orderId);

    }
}
