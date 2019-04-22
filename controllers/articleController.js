const axios = require("axios");
const cheerio = require("cheerio");
const Article = require("../models/Article")
const SavedArticles = require("../models/SavedArticles")
const Comment = require("../models/Comment")


exports.all = async function (req, res) {
   let articles
   try {
      articles = await Article.find();
      res.render("index", { articles: articles });
      console.log(articles.length)
   } catch (e) {
      res.send(e)
   }
}


exports.saveArticle = async function (req, res) {
   let article
   try {
      article = await Article.findOne({ _id: req.params.id })
      const savedArticle = new SavedArticles({
         title: article.title,
         summary: article.summary,
         href: article.href
      })
      await savedArticle.save()
      res.json(savedArticle);
   } catch (e) {
      res.send(e);
   }

}

exports.saveComment = async function (req, res) {
   let comment
   try {
      comment = await Article.findOne({ _id: req.params.id })
      const savedComment = new Comment({
         title: comment.title,
         comment: comment.body
      })
      await savedComment.save()
      res.json(savedComment);
   } catch (e) {
      res.send(e);
   }

}

exports.readComment = async function ( req, res){
   let comments
   try {
      comments = await Comment.find();
      res.render("index", { comment: comment});
      console.log(comment.length);
   } catch (e) {
      res.send(e)
   } 
}


exports.scrapeArticles = async function (req, res) {
   try {
      var response = await axios.get("https://www.nytimes.com/section/us");
   } catch (e) {
      res.send(e)
      return
   }
   var $ = cheerio.load(response.data);
   var element = $(`#stream-panel > div > ol > li`);

   try {
      for (let i = 1; i <= element.length; i++) {
         var href = $(`#stream-panel > div > ol > li:nth-child(${i}) a`).attr("href");
         var title = $(`#stream-panel > div > ol > li:nth-child(${i}) h2`).text();
         var summary = $(`#stream-panel > div > ol > li:nth-child(${i}) p`).text();
         var article = new Article({
            title: title,
            summary: summary,
            href: href
         })
         await article.save()
      }
      res.send("Posted!")
   } catch (e) {
      res.send(e)
   }
}
