using GeoAPI.Geometries;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data
{
    public class Station
    {
        public virtual int Id { get; set; }

        public virtual string Name { get; set; }

        public virtual IGeometry Geometry { get; set; }
    }
}
