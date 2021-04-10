using System.Linq;
using AppetiteAPI.DataAccess;
using AppetiteAPI.Models;

namespace AppetiteAPI.Services
{
    public class UserService : IUserService
    {
        private readonly DatabaseContext _dbContext;

        public UserService(DatabaseContext dbContext)
        {
            _dbContext = dbContext;
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
            throw new System.NotImplementedException();
        }

        public User Authenticate(string email, string password)
        {
            throw new System.NotImplementedException();
        }

        public bool IsEmailRegisteredAlready(string email)
        {
            return _dbContext.Users.Any(u => u.Email == email);
        }
    }
}