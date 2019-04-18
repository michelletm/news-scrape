var express = require('express');
var router = express.Router();
var articleController = require("../controllers/articleController")

router.get("/create", articleController.scrapeArticles);
router.get("/all", articleController.all);
router.get("/saveArticle/:id", articleController.saveArticle)


module.exports = router;
