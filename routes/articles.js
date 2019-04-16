var express = require('express');
var router = express.Router();
var articleController = require("../controllers/articleController")

router.get('/create', articleController.addArticle);

module.exports = router;
