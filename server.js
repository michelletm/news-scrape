///NEW server.js for NYT Scraper/////

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

// Hook mongojs configuration to the db variable
var db = mongojs(databaseUrl, collections);
db.on("error", function(error) {
  console.log("Database Error:", error);
});

// Main route (simple Hello World Message)

  


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

// app.use(function(req, res, next) {
//   next(createError(404));
// });

// Retrieve data from the db
app.get("/all", function(req, res) {
  // Find all results from the scrapedData collection in the db
  db.Article.find({}, function(error, data) {
    // Throw any errors to the console
    if (error) {
      console.log(error);
    }
    // If there are no errors, send the data to the browser as json
    else {
      res.json(found);
    }
  });
});

// // Scrape data from one site and place it into the mongodb db
// app.get("/scrape", function(req, res) {
//   // Make a request via axios for the news section of `ycombinator`
//   axios.get("https://news.ycombinator.com/").then(function(response) {
//     // Load the html body from axios into cheerio
//     var $ = cheerio.load(response.data);
//     // For each element with a "title" class
//     $(".title").each(function(i, element) {
//       // Save the text and href of each link enclosed in the current element
//       var title = $(element).children("a").text();
//       var link = $(element).children("a").attr("href");

//       // If this found element had both a title and a link
//       if (title && link) {
//         // Insert the data in the scrapedData db
//         db.scrapedData.insert({
//           title: title,
//           link: link
//         },
//         function(err, inserted) {
//           if (err) {
//             // Log the error if one is encountered during the query
//             console.log(err);
//           }
//           else {
//             // Otherwise, log the inserted data
//             console.log(inserted);
//           }
//         });
//       }
//     });
//   });

//   // Send a "Scrape Complete" message to the browser
//   res.send("Scrape Complete");
// });


app.listen(3000, function() {
  console.log("App running on port 3000!");
});

module.exports = app;//
