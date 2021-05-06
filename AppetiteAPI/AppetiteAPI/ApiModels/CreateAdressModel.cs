using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppetiteAPI.ApiModels
{
    public class CreateAdressModel
    {
        public string Street { get; set; }
        public string Housenumber { get; set; }
        public string Zipcode { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public double Latidude { get; set; }
        public double Longitude { get; set; }
    }
}
