using AppetiteAPI.ApiModels;
using AppetiteAPI.Models;

namespace AppetiteAPI.Services
{
    public interface IRestaurantAdministrationService
    {
        AuthenticateResponse Authenticate( string email, string password );

        void CreateRestaurant( string name, string password, Adress adress, string phoneNumber, string email, RestaurantType restaurantType );

        void DeleteRestaurant( string email );

        bool IsEmailRegisteredAlready( string email );
    }
}