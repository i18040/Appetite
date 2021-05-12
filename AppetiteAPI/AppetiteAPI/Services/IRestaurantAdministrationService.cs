using AppetiteAPI.ApiModels;
using AppetiteAPI.Models;

namespace AppetiteAPI.Services
{
    public interface IRestaurantAdministrationService
    {
        AuthenticateResponse Authenticate( string email, string password );

        void CreateRestaurant( CreateRestaurantModel model);

        void DeleteRestaurant( string email );

        bool IsEmailRegisteredAlready( string email );

        void SetDeliveryCosts( string email, double deliveryCosts );
    }
}