var http = require('http');
var mysql = require('mysql');
var location = require('./location');

let registerQuery = 'INSERT INTO event SET ?;';
let event_list_query = 'SELECT * FROM event';
let event_detail_query = 'SELECT * FROM event WHERE eventID = ?;';


exports.index = function (req,res,db) {
  res.send('NOT IMPLEMENTED: Home Page');
}
exports.event_create_get = function(req, res, db) {
  res.send('NOT IMPLEMENTED: Event create get');
}
exports.event_create_post = function (req, res, db) {
  var newEvent = {
    name: req.body.name,
    date: req.body.date,
    contactPhone: req.body.contactPhone,
    contactEmail: req.body.contactEmail,
    type: req.body.type,
    scope: req.body.scope,
    location_locationID: 1,
    user_userID: 1
  }
  let query = mysql.format(registerQuery, newEvent);
  db.query(query, function(error, results, fields) {
      console.log(error);
      console.log(results);
      console.log(fields);
  });
  res.redirect('/');
}

exports.event_list = function(req, res, db) {
  var query = mysql.format(event_list_query);
  db.query(query, function(error, results, fields){
      res.render('event_list',{title: 'Search Events','event_list': results});
  });
}
exports.event_details = function(req,res,db) {
  var query = mysql.format(event_detail_query, [req.params.id]);
  console.log(query);
  db.query(query, function(error, results, fields){
      console.log(results);
      res.render('event_details',{title: 'Event','events': results});
  });
}
