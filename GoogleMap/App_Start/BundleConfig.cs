using System.Web;
using System.Web.Optimization;

namespace GoogleMap
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/respond.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/site.css"));

            bundles.Add(new StyleBundle("~/Content/DataTables/css").Include(
                      //"~/Content/dataTables/dataTables.bootstrap.css",
                      //"~/Content/dataTables/dataTables.foundation.css",
                      //"~/Content/dataTables/dataTables.jqueryui.css",
                      "~/Content/DataTables/css/jquery.dataTables.css"
                      //"~/Content/datatables/jquery.dataTables_themeroller.css"
                      ));

            bundles.Add(new ScriptBundle("~/bundles/DataTables").Include(
                "~/Scripts/DataTables/jquery.dataTables.js",
                      "~/Scripts/dataTables/dataTables.bootstrap.js",
                      "~/Scripts/dataTables/dataTables.foundation.js",
                      "~/Scripts/dataTables/dataTables.jqueryui.js"
                      ));

            bundles.Add(new ScriptBundle("~/bundles/dataTablesDemo").Include(
                      "~/Scripts/datatableDemo/datatable-demo.js"
                      ));

            bundles.Add(new ScriptBundle("~/bundles/googleMap").Include(
                "~/Scripts/googleMap/map.js",
                "~/Scripts/googleMap/datatable-demo.js"

                      ));

        }
    }
}
