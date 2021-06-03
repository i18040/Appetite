using System;
using System.Collections.Generic;
using AppetiteAPI.Models;

namespace AppetiteAPI.ApiModels
{
    public class ReviewReturnModel
    {
        public string Username { get; set; }
        public DateTime CreationTime { get; set; }
        public string Text { get; set; }
        public Rating Rating { get; set; }
        public List<string> Pictures { get; set; }
    }
}