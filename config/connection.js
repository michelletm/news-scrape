//mongoose setup

var mongoose = require("mongoose");
var mongoDB = "mongodb://localhost/nytscraper_db";
mongoose.connect(mongoDB, { useNewUrlParser: true });
var db = mongoose.connection;

db.once("open", function () {
   console.log("Connected!")
})

module.exports = db;
