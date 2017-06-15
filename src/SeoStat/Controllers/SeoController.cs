using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using SeoStat.Scraper;
using Microsoft.AspNetCore.Cors;

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
        public async Task<IEnumerable<int>> Get(string keywords, string url)
        {
            return await scraper.GetResultPoistionForLinkAsync(keywords, url);
        }

    }
}
