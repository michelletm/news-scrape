const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/new_db", {useNewUrlParser: true});
const db = mongoose.connection;

var Schema = mongoose.Schema;

const articleSchema = new Schema({
   title:  String,
   summary: String,
   href:   String,
   comments: [String] 
});

var Article = mongoose.model("Article", articleSchema);

var article1 = new Article({title: "Small"});

db.on("error", function(error){
   console.log(error)
});

db.once("open", function(){
   console.log("Connected!")
   article1.save(function (err){
      if(err){
      console.log(err)
      return
      }
      console.log("Save")
      mongoose.disconnect()
   });
});