using NHibernate;
using NHibernate.Cfg;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data
{
    public class NHibernateHelper
    {
        private static ISessionFactory _sessionFactory;

        private static object _locker = new object();

        public static ISessionFactory SessionFactory
        {
            get
            {
                lock (_locker)
                {
                    if (_sessionFactory == null)
                    {
                        var _configuration = new Configuration();

                        _configuration.Configure();

                        _configuration.AddAssembly(typeof(Station).Assembly);

                        _sessionFactory = _configuration.BuildSessionFactory();
                    }

                    return _sessionFactory;
                }
            }
        }

        public static ISession OpenSession()
        {
            return SessionFactory.OpenSession();
        }

        public static IStatelessSession OpenStatelessSession()
        {
            return SessionFactory.OpenStatelessSession();
        }
    }
}
