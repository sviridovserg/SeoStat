using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using WebScraper;
using System.Linq;

namespace WebScraperTests
{
    [TestClass]
    public class ArgumentsTests
    {
        [TestMethod]
        public void GivenKeywordsAndLink_ShouldParse()
        {
            var result = Arguments.Parse(new string[] { "-keywords", "example1", "example2", "-link", "example.com" });
            Assert.AreEqual("example.com", result.Link);
            Assert.AreEqual(2, result.Keywords.Count());
            Assert.IsTrue((new string[] { "example1", "example2" }).All(s => result.Keywords.Contains(s)));
        }

        [TestMethod]
        [ExpectedException(typeof(ArgumentException))]
        public void IfNoKeywords_ParseShouldThrowException()
        {
            Arguments.Parse(new string[] {  "example1", "example2", "-link", "example.com" });
        }

        [TestMethod]
        [ExpectedException(typeof(ArgumentException))]
        public void IfZeroKeywords_ParseShouldThrowException()
        {
            Arguments.Parse(new string[] { "-keywords", "-link", "example.com" });
        }

        [TestMethod]
        [ExpectedException(typeof(ArgumentException))]
        public void IfNoLinkWord_ParseShouldThrowException()
        {
            Arguments.Parse(new string[] { "-keywords", "example1", "example2", "example.com" });
        }

        [TestMethod]
        [ExpectedException(typeof(ArgumentException))]
        public void IfNoLinkValue_ParseShouldThrowException()
        {
            Arguments.Parse(new string[] { "-keywords", "example1", "example2", "-link" });
        }

    }
}
