const axios = require("axios");
const cheerio = require("cheerio");
var Article = require("../models/article")

async function addArticle (req, res){
   var article = new Article({title: "The Title", href: "http://nyt.come"}) 
      try {
         await article.save();
         res.send("Saved!")
      } catch (e) {
         res.send(err);
      }

   }
module.exports = { addArticle }


async function scrapeArticles(req, res){
   try {
      var response = await axios.get("https:/www.nytimes.com/section/us");
      var $ = cheerio.load(response.data);
      var element = $(`#stream-panel > div > ol > li`);

      for(let i=1; i <= element.length; i++) {
         var href = $(`#stream-panel > div > ol > li:nth-child(${i}) a`).attr("href");
         var title = $(`#stream-panel > div > ol > li:nth-child(${i}) h2`).text();
         var summary = $(`#stream-panel > div > ol > li:nth-child(${i}) p`).text();
         var article = new Article({
            title: title,
            summary: summary,
            href: href
         })
         await article.save()
         res.send("Posted!")
      }
   } catch(e){
      res.send(e)
   }        
}
