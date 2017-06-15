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
            var tcs = new TaskCompletionSource<IEnumerable<int>>();
            Thread thread = new Thread(() =>
            {
                WebBrowser wb = new WebBrowser();
                wb.AllowNavigation = true;
                wb.ScrollBarsEnabled = true;
                wb.ScriptErrorsSuppressed = true;
                wb.Visible = false;
                wb.Navigate("https://www.google.com.au/#q=online+title+search&start=0");

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
                    if (links[i].Contains("infotrack.com.au"))
                    {
                        result.Add(i);
                    }
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
    }
}
