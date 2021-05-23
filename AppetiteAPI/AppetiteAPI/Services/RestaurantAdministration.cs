using System.Collections.Generic;
using AppetiteAPI.ApiModels;
using AppetiteAPI.DataAccess;
using AppetiteAPI.Helpers;
using AppetiteAPI.Services;
using Microsoft.Extensions.Options;
using AppetiteAPI.Models;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace AppetiteAPI.Services
{
    public class RestaurantAdministration : IRestaurantAdministrationService
    {
        private readonly AppSettings _appSettings;
        private readonly DatabaseContext _dbContext;
        private PictureHelper _pictureHelper;

        public RestaurantAdministration( DatabaseContext dbContext, IOptions<AppSettings> appSettings )
        {
            _dbContext = dbContext;
            _appSettings = appSettings.Value;
            _pictureHelper = new PictureHelper();
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

        public void CreateRestaurant(CreateRestaurantModel model)
        {
            string logoName = "";
            if(model.Logo != null)
            {
                logoName = $"{model.Email}_{model.Logo.FileName}";
                _pictureHelper.SavePicture(model.Logo, logoName, "Logo");
            }

            var newRestaurant = new Restaurant
            {
                Name = model.Name,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(model.Password),
                Adress = new Adress()
                {
                    Street = model.Adress.Street,
                    Housenumber = model.Adress.Housenumber,
                    Zipcode = model.Adress.Zipcode,
                    City = model.Adress.City,
                    Country = model.Adress.Country,
                    Latidude = model.Adress.Latitude,
                    Longitude = model.Adress.Longitude
                },
                Email = model.Email,
                PhoneNumber = model.PhoneNumber,
                RestaurantType = model.RestaurantType,
                Logo = logoName,
                DeliveryCosts = model.DeliveryCosts
            };

            _dbContext.Restaurants.Add(newRestaurant);
            _dbContext.SaveChanges();
        }

        public bool DeleteRestaurant( string email )
        {
            var restaurant = _dbContext.Restaurants.Where(r => r.Email == email)
                .Include(r => r.Menu)
                .ThenInclude(p => p.Orders)
                .FirstOrDefault();
            
            var orders = new List<Order>();
            restaurant.Menu.ForEach(p => orders.AddRange(p.Orders));
            if (orders.Any(o => o.IsDone == false))
            {
                return false;
            }
            
            restaurant.Menu.ForEach(p => p.Orders = null);
            restaurant.Menu = null;
            
            _dbContext.Restaurants.Remove(restaurant);
            _dbContext.SaveChanges();
            return true;
        }

        public bool IsEmailRegisteredAlready( string email )
        {
            return _dbContext.Restaurants.Any(r => r.Email == email);
        }

        public void SetDeliveryCosts(string email, double deliveryCosts )
        {
            var restaurant = _dbContext.Restaurants.SingleOrDefault(r => r.Email == email);
            restaurant.DeliveryCosts = deliveryCosts;
            _dbContext.Restaurants.Update(restaurant);
            _dbContext.SaveChanges();
        }
    }
}