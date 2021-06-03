using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppetiteAPI.ApiModels
{
    public class CancelOrderModel
    {
        public string UserEmail { get; set; }
        public int OrderId { get; set; }
    }
}
