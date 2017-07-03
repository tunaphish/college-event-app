var mysql = require('mysql');
var user = require('./user');
var event = require('./event');

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

exports.registerUser = (req,res) => user.registerUser(req,res,db);
exports.registerEvent = (req,res) => event.registerEvent(req,res,db);
