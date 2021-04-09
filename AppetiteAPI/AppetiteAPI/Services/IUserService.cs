using AppetiteAPI.Models;

namespace AppetiteAPI.Services
{
    public interface IUserService
    {
        void CreateUser(string email, string password, string name);
        void DeleteUser(string email);
        User Authenticate(string email, string password);
    }
}