using System.ComponentModel.DataAnnotations;

namespace AppetiteAPI.ApiModels
{
    public class CreateUserModel
    {
        [Required]
        public string Email { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Password { get; set; }
    }
}