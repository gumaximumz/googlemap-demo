using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StationServices.Models
{
    public class LatLngModel
    {
        public double lat { get; set; }

        public double lng { get; set; }
    }

    public class CircleModel : LatLngModel
    {
        public double radius { get; set; }

    }

    public class PolygonsModel
    {
        public LatLngModel[] Path { get; set; }
    }

    public class RectangleModel
    {
        public LatLngModel NorthEast { get; set; }

        public LatLngModel SouthWest { get; set; }

    }
}
