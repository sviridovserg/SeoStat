using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace WebScraper
{
    class Program
    {
        static void Main(string[] args)
        {
            var argParsed = ArgumentsParser.Parse(args);
            var tcs = new TaskCompletionSource<IEnumerable<int>>();
            Thread thread = new Thread(() =>
            {
                WebBrowser wb = new WebBrowser();
                wb.AllowNavigation = true;
                wb.ScrollBarsEnabled = true;
                wb.ScriptErrorsSuppressed = true;
                wb.Visible = false;
                var keywords = Uri.EscapeUriString(string.Join(" ", argParsed.Keywords));
                var step = 10;
                var result = new List<int>();
                for (var i = 0; i < 10; i++)
                {
                    result.AddRange(GetPositionsForLink(wb, $"https://www.google.com.au/#q={keywords}&start={i * step}", argParsed.Link).Select(pos => pos + i * step + 1));
                }
               
                tcs.SetResult(result);

            });
            thread.SetApartmentState(ApartmentState.STA);
            thread.Start();
            thread.Join();
            var res = tcs.Task.Result;
            Console.WriteLine(String.Join(" ", res));
            return;
        }

        private static IEnumerable<int> GetPositionsForLink(WebBrowser wb, string pageUrl, string link)
        {
            wb.Navigate(pageUrl);

            while (wb.ReadyState != WebBrowserReadyState.Complete)
            {
                Thread.Sleep(500);
                System.Windows.Forms.Application.DoEvents();
            }

            var el = wb.Document.GetElementById("rso");
            while (el == null)
            {
                Thread.Sleep(500);
                el = wb.Document.GetElementById("rso");
                System.Windows.Forms.Application.DoEvents();
            }

            var links = el.GetElementsByTagName("h3").Cast<HtmlElement>().Select(h => h.FirstChild.GetAttribute("href")).ToArray();
            List<int> result = new List<int>();
            for (var i = 0; i < links.Length; i++)
            {
                if (links[i].Contains(link))
                {
                    result.Add(i);
                }
            }
            return result;
        }
    }
}
