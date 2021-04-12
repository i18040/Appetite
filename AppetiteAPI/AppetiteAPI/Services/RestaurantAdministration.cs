using AppetiteAPI.ApiModels;
using AppetiteAPI.DataAccess;
using AppetiteAPI.Helpers;
using AppetiteAPI.Services;
using Microsoft.Extensions.Options;
using AppetiteAPI.Models;
using System.Linq;

namespace AppetiteAPI.Services
{
    public class RestaurantAdministration : IRestaurantAdministrationService
    {
        private readonly AppSettings _appSettings;
        private readonly DatabaseContext _dbContext;
        private readonly UserService _userService;

        public RestaurantAdministration( DatabaseContext dbContext, IOptions<AppSettings> appSettings, UserService userService )
        {
            _dbContext = dbContext;
            _appSettings = appSettings.Value;
            _userService = userService;
        }

        public AuthenticateResponse Authenticate( string email, string password )
        {
            return _userService.Authenticate(email, password);
        }

        public void CreateRestaurant( string name, string password, Adress adress, string phoneNumber, RestaurantType restaurantType )
        {
            var newRestaurant = new Restaurant
            {
                Name = name,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(password),
                Adress = adress,
                PhoneNumber = phoneNumber,
                RestaurantType = restaurantType
            };

            _dbContext.Restaurants.Add(newRestaurant);
            _dbContext.SaveChanges();
        }

        public void DeleteRestaurant( string name )
        {
            var restaurant = _dbContext.Restaurants.SingleOrDefault(r => r.Name == name);
            _dbContext.Restaurants.Remove(restaurant);
            _dbContext.SaveChanges();
        }

        public bool IsEmailRegisteredAlready( string email )
        {
            return _userService.IsEmailRegisteredAlready(email);
        }
    }
}