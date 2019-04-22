var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
 
  title: {
    type: String,
    required: true
  },

  summary: {
     type: String
  },
  
  href: {
    type: String,
    required: true
  },

  comments: {
    type: [String],
    default: undefined
  },

  date: {
    type : Date, 
    default: Date.now 
  }


});

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;
