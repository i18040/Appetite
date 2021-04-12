using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using AppetiteAPI.ApiModels;
using AppetiteAPI.DataAccess;
using AppetiteAPI.Helpers;
using AppetiteAPI.Models;
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

        public void DeleteUser(string email)
        {
            var user = _dbContext.Users.SingleOrDefault(u => u.Email == email);
            _dbContext.Users.Remove(user);
            _dbContext.SaveChanges();
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
        
        private string GenerateJwt(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim(ClaimTypes.Email, user.Email) }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}