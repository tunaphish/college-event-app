var mysql = require('mysql');
var user = require('./user');
var event = require('./event');
var location = require('./location');
var rso = require('./rso');
var university = require('./university');

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

exports.addUser = (req,res) => user.addUser(req,res,db);
exports.addEvent = (req,res) => event.addEvent(req,res,db);
exports.addLocation = (req,res) => location.addLocation(req,res,db);
exports.addRSO = (req,res) => rso.addRSO(req,res,db);
exports.getUniversities = (req,res) => university.getUniversities(req,res,db);
