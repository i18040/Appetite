using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AppetiteAPI.Models;

namespace AppetiteAPI.ApiModels
{
    public class UserModel
    {
        public UserModel(User user)
        {
            Email = user.Email;
            Name = user.Name;
        }
        public string Email { get; set; }
        public string Name { get; set; }
    }
}
