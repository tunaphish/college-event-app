var express = require('express');
var path = require('path');
var router = express.Router();
var session = require('express-session');

/* GET home page. */
router.get('/', function(req, res, next) {
  var user = 'Guest'
  if (session.fullname) user = session.fullname;
  res.render('index', {title: 'Welcome ' + user});
});

module.exports = router;
