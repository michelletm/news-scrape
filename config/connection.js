//mongoose setup

var mongoose = require("mongoose");
var mongoDB = "mongodb://localhost/nytscraper_db";
mongoose.connect(mongoDB, { useNewUrlParser: true });
var db = mongoose.connection;

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/reactreadinglist");

db.once("open", function () {
   console.log("Connected!")
})

module.exports = db;
