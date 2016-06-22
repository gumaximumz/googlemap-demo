using Data;
using StationServices.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using NHibernate.Linq;

namespace StationServices.Services
{
    public class StationService
    {
        public LatLngModel[] GetPoint()
        {
            return new LatLngModel[]
            {
                new LatLngModel() { lat = 13.000213, lng = 100.23123 },
                new LatLngModel() { lat = 13.212322, lng = 100.23434 },
                new LatLngModel() { lat = 13.431232, lng = 100.43232 }
            };
        }

        public PolygonsModel GetPolygon(LatLngModel[] LatLng)
        {
            return new PolygonsModel
            {
                Path = LatLng
            };
        }

        public LatLngModel[] GetStation()
        {
            var session = NHibernateHelper.OpenSession();

            using(var tx = session.BeginTransaction())
            {
                var query = session.Query<Station>().OrderBy(s => s.Name).ToArray();

                var model = query.Select(s => new LatLngModel() { lat = s.Geometry.Centroid.Y, lng = s.Geometry.Centroid.X }).ToArray();

                tx.Commit();

                return model;
            }
        }

        public DatatableModel MapDataCircle(CircleModel data)
        {
            return new DatatableModel
            {
                name = "circle" + DateTime.Now.ToString(),
                centerlat = data.lat,
                centerlng= data.lng,
                radius = data.radius
            };
        }

        public DatatableModel MapDataPolygon(LatLngModel[] data)
        {
            return new DatatableModel
            {
                name = "polygon" + DateTime.Now.ToString(),
                latlist = string.Join(",", data.Select(d=>d.lat)),
                lnglist = string.Join(",", data.Select(d => d.lng)),
            };
        }

        public DatatableModel MapDataRectangle(RectangleModel data)
        {
            return new DatatableModel
            {
                name = "rectangle" + DateTime.Now.ToString(),
                north = data.NorthEast.lat,
                south = data.SouthWest.lat,
                east = data.NorthEast.lng,
                west = data.SouthWest.lng
            };
        }
    }
}
