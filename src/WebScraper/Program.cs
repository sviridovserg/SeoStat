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
            var tcs = new TaskCompletionSource<string>();
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

                var infoCount = el.GetElementsByTagName("h3").Cast<HtmlElement>().Where(h => h.FirstChild.GetAttribute("href").Contains("infotrack.com.au")).Count();

                var dock = wb.Document;
                tcs.SetResult(string.Empty);

            });
            thread.SetApartmentState(ApartmentState.STA);
            thread.Start();
            thread.Join();
            var res = tcs.Task.Result;
            Console.WriteLine("Done");
            return;
        }
    }
}
