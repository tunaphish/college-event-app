var http = require('http');
var mysql = require('mysql');
var q = require('Q');

let event_create_query = 'INSERT INTO event SET ?;';
let event_list_query = 'SELECT * FROM event';
let event_detail_query = 'SELECT * FROM event WHERE eventID = ?;';

exports.index = function (req,res,db) {
  res.send('NOT IMPLEMENTED: Home Page');
}
exports.event_create_get = function(req, res, db) {
  res.render('event_form', {title: 'Register Event!'});
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
  console.log(newEvent);
  let query = mysql.format(event_create_query, newEvent);
  db.query(query, function(error, results, fields) {
      console.log(error);
      console.log(results);
      console.log(fields);
      res.redirect('/event/' + results.insertId);
  });
}

exports.event_list = function(req, res, db) {
  var query = mysql.format(event_list_query);
  db.query(query, function(error, results, fields){
      res.render('event_list',{title: 'Search Events','event_list': results});
  });
}
exports.event_details = function(req,res,db) {
  var query = mysql.format(event_detail_query, [req.params.id]);
  db.query(query, function(error, results, fields){
      res.render('event_details',{title: 'Event','events': results});
  });
}
