var express = require("express");
var mongojs = require("mongojs");
var axios = require("axios");
var cheerio = require("cheerio");
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var createError = require('http-errors');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


var databaseUrl = "nytscraper_db";
var collections = ["Article", "SavedArticles"];


var indexRouter = require('./routes/index');
var articlesRouter = require('./routes/articles');

connection = require("./config/connection");

var db = mongojs(databaseUrl, collections);
db.on("error", function(error) {
  console.log("Database Error:", error);
});


app.use('/', indexRouter);
app.use('/articles', articlesRouter);

app.get("/test", async function(req, res){
  
  var article = new Article({title: "title", href: "href"})
  
  try {
    await article.save();
    res.send("Success")
  } catch(e) {
    res.send(e);
  }

})

app.get("/all", function(req, res) {
  
  db.Article.find({}, function(error, data) {

    if (error) {
      console.log(error);
    }
    else {
      res.json(found);
    }
  });
});


app.listen(process.env.PORT || 3000, function() {
  console.log("App running on port 3000!");
});

module.exports = app;
