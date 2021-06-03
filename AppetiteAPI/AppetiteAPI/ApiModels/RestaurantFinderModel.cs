using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using AppetiteAPI.Models;
using GeoCoordinatePortable;

namespace AppetiteAPI.ApiModels
{
    public class RestaurantFinderModel
    {
        [Required]
        public HelpCoordinates Coordinate { get; set; }
        public int Distance { get; set; }
        public RestaurantType Type { get; set; }
    }
}
