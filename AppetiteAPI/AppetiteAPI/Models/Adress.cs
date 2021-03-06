using System.ComponentModel.DataAnnotations.Schema;
using AppetiteAPI.ApiModels;
using GeoCoordinatePortable;

namespace AppetiteAPI.Models
{
    public class Adress
    {
        public int Id { get; set; }
        public string Street { get; set; }
        public string Housenumber { get; set; }
        public string Zipcode { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public double Latidude { get; set; }
        public double Longitude { get; set; }
    }
}