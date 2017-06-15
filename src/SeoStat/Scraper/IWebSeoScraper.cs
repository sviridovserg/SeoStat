using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SeoStat.Scraper
{
    public interface IWebSeoScraper
    {
        Task<IEnumerable<int>> GetResultPoistionForLinkAsync(string keywords, string link);
    }
}
