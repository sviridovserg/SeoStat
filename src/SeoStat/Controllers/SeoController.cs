using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using SeoStat.Scraper;

namespace SeoStat.Controllers
{
    [Route("api/[controller]")]
    public class SeoController : Controller
    {
        private IWebSeoScraper scraper;
        public SeoController(IWebSeoScraper sc)
        {
            scraper = sc;
        }

        [HttpGet]
        public async Task<IEnumerable<int>> Get()
        {
            return await scraper.GetResultPoistionForLinkAsync("online title search", "infotrack.com.au");
        }

    }
}
