var express = require('express');
var path = require('path');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var mysql = require('mysql');
  var db = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'newpass',
      database: 'siteDB'
  });
  db.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
  });
  db.query('SELECT * from university', function(err, rows) {
    res.render('index.ejs', {universities: rows});
  });
});

module.exports = router;
