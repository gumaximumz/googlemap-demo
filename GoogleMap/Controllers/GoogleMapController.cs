using NHibernate.Mapping;
using StationServices.Models;
using StationServices.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace GoogleMap.Controllers
{

    public class GoogleMapController : Controller
    {
        private StationService _stationService = new StationService();
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult GetPoint()
        {
            var point = this._stationService.GetPoint();

            return Json(point, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetPolygon()
        {
            return Json(Session["polygons"], JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetRectangle()
        {
            return Json(Session["rectangle"], JsonRequestBehavior.AllowGet);
        }

        public ActionResult getCircle()
        {
            return Json(Session["circle"], JsonRequestBehavior.AllowGet);
        }

        public ActionResult SaveCircle(CircleModel circle)
        {
            List<CircleModel> list = Session["circle"] == null ? new List<CircleModel>() : (List<CircleModel>)Session["circle"];
            list.Add(circle);
            Session["circle"] = list;
            var data = _stationService.MapDataCircle(circle);
            AddTemp(data);
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        public ActionResult SavePolygon(LatLngModel[] polygons)
        {
            List<PolygonsModel> list = Session["polygons"] == null ? new List<PolygonsModel>() : (List<PolygonsModel>)Session["polygons"];
            list.Add(_stationService.GetPolygon(polygons));
            Session["polygons"] = list ;
            var data = _stationService.MapDataPolygon(polygons);
            AddTemp(data);
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        public ActionResult SaveRectangle(RectangleModel rectangle)
        {
            List<RectangleModel> list = Session["rectangle"] == null ? new List<RectangleModel>() : (List<RectangleModel>)Session["rectangle"];
            list.Add(rectangle);
            Session["rectangle"] = list;
            var data = _stationService.MapDataRectangle(rectangle);
            AddTemp(data);
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        public void AddTemp(DatatableModel data)
        {
            List<DatatableModel> listData = Session["temp"] == null ? new List<DatatableModel>() : (List<DatatableModel>)Session["temp"];
            listData.Add(data);
            Session["temp"] = listData;
        }
        public ActionResult GetTemp()
        {
            return Json(Session["temp"], JsonRequestBehavior.AllowGet);
        }


        public void SesionClear()
        {
            Session.Clear();
        }
        public ActionResult GetStation()
        {
            var model = this._stationService.GetStation();

            return Json(model, JsonRequestBehavior.AllowGet);
        }
    }
}