using StationServices.Models;
using StationServices.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Datatable.Controllers
{

    public class DatatableController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }
    }
}