using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebScraper
{
    class ArgumentsParser
    {
        public IEnumerable<string> Keywords { get; }
        public string Link { get; }

        public ArgumentsParser(string[] keywords, string link)
        {
            Keywords = keywords;
            Link = link;
        }

        private enum Arg
        {
            Keywords,
            Link,
            Unknown
        }
        public static ArgumentsParser Parse(string[] args)
        {
            if (args.Length < 4)
            {
                throw new ArgumentException("Arguments format is: -keywords example -link exampl.com", nameof(args));
            }
            return new ArgumentsParser(GetKeywordsArg(args), GetLinkArg(args));
        }

        private static string GetLinkArg(string[] args)
        {
            var items = args.SkipWhile(s => ConvertToArg(s) != Arg.Link).ToArray();
            if (items.Length < 2)
            {
                throw new ArgumentException("Arguments missing -link seteting");
            }
            return items[1];
        }

        private static string[] GetKeywordsArg(string[] args)
        {
            var items = args.SkipWhile(s => ConvertToArg(s) != Arg.Keywords).ToArray();
            if (items.Length < 2)
            {
                throw new ArgumentException("Arguments missing -keywords seteting");
            }
            return items.Skip(1).TakeWhile(s => !IsArgName(s)).ToArray();
        }

        private static bool IsArgName(string a)
        {
            return a.StartsWith("-");
        }

        private static Arg ConvertToArg(string a)
        {
            switch (a)
            {
                case "-keywords": return Arg.Keywords;
                case "-link": return Arg.Link;
                default: return Arg.Unknown;
            }
        }
    }
}
