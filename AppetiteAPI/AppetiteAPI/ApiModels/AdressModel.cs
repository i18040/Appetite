using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AppetiteAPI.Models;

namespace AppetiteAPI.ApiModels
{
    public class AdressModel
    {
        public AdressModel(Adress model)
        {
            Id = model.Id;
            Street = model.Street;
            Housenumber = model.Housenumber;
            Zipcode = model.Zipcode;
            City = model.City;
            Country = model.Country;
            Latitute = model.Latidute;
            Longitude = model.Longitude;
        }
        public int Id { get; set; }
        public string Street { get; set; }
        public string Housenumber { get; set; }
        public string Zipcode { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public double Latitute { get; set; }
        public double Longitude { get; set; }
    }
}
