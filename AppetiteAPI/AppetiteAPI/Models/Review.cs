using System;
using System.Collections.Generic;
using AppetiteAPI.ApiModels;

namespace AppetiteAPI.Models
{
    public class Review
    {
        public int Id { get; set; }
        public User User { get; set; }
        public DateTime CreationTime { get; set; }
        public string Text { get; set; }
        public Rating Rating { get; set; }
        public Restaurant Restaurant { get; set; }
        
        //public List<Pic> Pictures { get; set; }
    }
}