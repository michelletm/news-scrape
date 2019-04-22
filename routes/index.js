var express = require('express');
var router = express.Router();
var articleController = require("../controllers/articleController")
//var Article = require("../models/Article")
const db = require("../models")

/* GET home page. */
router.get("/", articleController.all);

router.get('/index', function(req, res) {
  console.log("we are at the root")
  db.Article.find({})
    .then(function(dbArticle){
      console.log(dbArticle)
      if (dbArticle.length == 0) {
        console.log("no data found")
        res.render("index");
    }
    else {
        console.log("there is data")
        res.redirect("index");
     }
    }).catch((err)=>{
        res.json(err);
    });
});

//POST savedArticle***



//POST savedComment



router.get("/")

//       let articleResult = {article: dbArticle};
//       res.render("articles/all", articleResult)
//     });
// });
module.exports = router;
