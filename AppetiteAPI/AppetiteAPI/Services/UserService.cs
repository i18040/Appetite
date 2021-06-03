using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using AppetiteAPI.ApiModels;
using AppetiteAPI.DataAccess;
using AppetiteAPI.Helpers;
using AppetiteAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace AppetiteAPI.Services
{
    public class UserService : IUserService
    {
        private readonly DatabaseContext _dbContext;
        private readonly AppSettings _appSettings;

        public UserService(DatabaseContext dbContext, IOptions<AppSettings> appSettings)
        {
            _dbContext = dbContext;
            _appSettings = appSettings.Value;
        }
        
        public void CreateUser(string email, string password, string name)
        {
            var newUser = new User
            {
                Email = email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(password),
                Name = name
            };
            
            _dbContext.Users.Add(newUser);
            _dbContext.SaveChanges();
        }

        public bool DeleteUser(string email)
        {
            var user = _dbContext.Users.SingleOrDefault(u => u.Email == email);
            var anyUnfinishedOrders = _dbContext.Orders.Any(o => o.User.Email == email && o.IsDone == false);

            if (anyUnfinishedOrders)
            {
                return false;
            }

            var userOrders = _dbContext.Orders.Where(o => o.User.Email == email && o.IsDone == false)
                .ToList();
            _dbContext.Orders.RemoveRange(userOrders);

            var userReviews = _dbContext.Reviews.Where(r => r.User.Email == email);
            _dbContext.Reviews.RemoveRange(userReviews);
            
            _dbContext.Users.Remove(user);
            _dbContext.SaveChanges();
            return true;
        }

        public AuthenticateResponse Authenticate(string email, string password)
        {
            var user = _dbContext.Users.SingleOrDefault(u => u.Email == email);

            if (user == null)
            {
                return null;
            }

            if (!BCrypt.Net.BCrypt.Verify(password, user.PasswordHash))
            {
                return null;
            }

            var jwt = GenerateJwt(user);

            return new AuthenticateResponse(user, jwt);
        }

        public bool IsEmailRegisteredAlready(string email)
        {
            return _dbContext.Users.Any(u => u.Email == email);
        }

        private string GenerateJwt( User user )
        {
            Helpers.Services services = new Helpers.Services(_appSettings);
            return services.GenerateJwt(user.Email);
        }
    }
}