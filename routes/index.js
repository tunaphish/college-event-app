var express = require('express');
var path = require('path');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var db = req.db;
  //var universities = db.getUniversities(req,res);
  //res.render('index.ejs',db.getUniversities(req,res));
  res.sendFile(path.join(__dirname, '../views', 'index.html'));

});

module.exports = router;
