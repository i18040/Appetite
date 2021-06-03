using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AppetiteAPI.Models;
using Microsoft.AspNetCore.Http;

namespace AppetiteAPI.ApiModels
{
    public class DeleteReviewModel
    {
        public string UserEmail { get; set; }
        public string RestaurantEmail { get; set; }
    }
}
