var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var SavedArticlesSchema = new Schema({
 
  title: {
    type: String,
    required: true
  },

  summary: {
     type: String
  },
  
  href: {
    type: String,
    required: true,
    unique: true,
    dropDupes: true
  }

});

var SavedArticles = mongoose.model("SavedArticles", SavedArticlesSchema);

module.exports = SavedArticles;
