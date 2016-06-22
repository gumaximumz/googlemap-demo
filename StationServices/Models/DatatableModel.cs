using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StationServices.Models
{
    public class DatatableModel
    {
        public string name { get; set; }
        public double? north { get; set; }
        public double? south { get; set; }
        public double? east { get; set; }
        public double? west { get; set; }
        public double? centerlat { get; set; }
        public double? centerlng { get; set; }
        public double? radius { get; set; }
        public string latlist { get; set; }
        public string lnglist { get; set; }
    }
}
