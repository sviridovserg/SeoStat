using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.IO;

namespace SeoStat.Controllers
{
    [Route("api/[controller]")]
    public class SeoController : Controller
    {
        [HttpGet]
        public async Task<string> Get()
        {
            var location = AppDomain.CurrentDomain.BaseDirectory;
            return await Task.Run(() =>
            {
                var proc = new System.Diagnostics.Process
                {
                    StartInfo = new System.Diagnostics.ProcessStartInfo
                    {
                        FileName = location + "\\\\WebScraper.exe",
                        Arguments = "command line arguments to your executable",
                        UseShellExecute = false,
                        RedirectStandardOutput = true,
                        CreateNoWindow = true
                    }
                };
                proc.Start();
                string res = "";
                while (!proc.StandardOutput.EndOfStream)
                {
                    res = proc.StandardOutput.ReadLine();
                    // do something with line
                }
                return res;
            });

        }

    }
}
