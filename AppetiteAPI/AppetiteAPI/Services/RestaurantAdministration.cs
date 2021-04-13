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

        public RestaurantAdministration( DatabaseContext dbContext, IOptions<AppSettings> appSettings )
        {
            _dbContext = dbContext;
            _appSettings = appSettings.Value;
        }

        public AuthenticateResponse Authenticate( string email, string password )
        {
            Restaurant restaurant = _dbContext.Restaurants.SingleOrDefault(u => u.Email == email);

            if( restaurant == null )
            {
                return null;
            }

            if( !BCrypt.Net.BCrypt.Verify(password, restaurant.PasswordHash) )
            {
                return null;
            }

            string jwt = GenerateJwt(restaurant);

            return new AuthenticateResponse(restaurant, jwt);
        }

        private string GenerateJwt( Restaurant restaurant )
        {
            Helpers.Services services = new Helpers.Services(_appSettings);
            return services.GenerateJwt(restaurant.Email);
        }

        public void CreateRestaurant( string name, string password, Adress adress, string phoneNumber, string email, RestaurantType restaurantType )
        {
            var newRestaurant = new Restaurant
            {
                Name = name,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(password),
                Adress = adress,
                Email = email,
                PhoneNumber = phoneNumber,
                RestaurantType = restaurantType
            };

            _dbContext.Restaurants.Add(newRestaurant);
            _dbContext.SaveChanges();
        }

        public void DeleteRestaurant( string email )
        {
            var restaurant = _dbContext.Restaurants.SingleOrDefault(r => r.Email == email);
            _dbContext.Restaurants.Remove(restaurant);
            _dbContext.SaveChanges();
        }

        public bool IsEmailRegisteredAlready( string email )
        {
            return _dbContext.Restaurants.Any(r => r.Email == email);
        }
    }
}