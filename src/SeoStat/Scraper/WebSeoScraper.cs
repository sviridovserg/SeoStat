using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SeoStat.Scraper
{
    public class WebSeoScraper : IWebSeoScraper
    {
        public async Task<IEnumerable<int>> GetResultPoistionForLinkAsync(string keywords, string link)
        {
            var location = AppDomain.CurrentDomain.BaseDirectory;
            return await Task.Run(() =>
            {
                var proc = new System.Diagnostics.Process
                {
                    StartInfo = new System.Diagnostics.ProcessStartInfo
                    {
                        FileName = location + "\\\\WebScraper.exe",
                        Arguments = $"-keywords {keywords} -link {link}",
                        UseShellExecute = false,
                        RedirectStandardOutput = true,
                        CreateNoWindow = true
                    }
                };
                proc.Start();
                var result = proc.StandardOutput.ReadToEnd().Split(' ').Select(s => int.Parse(s));
                return result;
            });
        }
    }
}
