using AppetiteAPI.Models;

namespace AppetiteAPI.Services
{
    public class UserService : IUserService
    {
        public void CreateUser(string email, string password, string name)
        {
            var newUser = new User
            {
                Email = email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(password),
                Name = name
            };
        }

        public void DeleteUser(string email)
        {
            throw new System.NotImplementedException();
        }

        public User Authenticate(string email, string password)
        {
            throw new System.NotImplementedException();
        }
    }
}