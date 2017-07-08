var http = require('http');
var mysql = require('mysql');
var q = require('Q');
var session = require('express-session');

let event_create_query = 'INSERT INTO event SET ?;';
let event_list_query = 'SELECT * FROM event';
let event_detail_query = 'SELECT * FROM event WHERE eventID = ?;';

exports.event_create_get = function(req, res, db) {
    db.query('SELECT * FROM rso', function(error, results, fields) {
      console.log(error);
      console.log(results);
      console.log(fields);
      (session.type === 'Admin') ?
      res.render('event_form', {title: 'Register Event!', rsos: results, authorized: 'authorized'}) :
      res.render('event_form', {title: 'Register Event!', rsos: results});
    });
}
exports.event_create_post = function (req, res, db) {
  function locationQuery() {
    var defered = q.defer();
    var newLocation = {
      name: req.body.locationName,
      longitude: req.body.locationLng,
      latitude: req.body.locationLat
    }
    let query = mysql.format('INSERT INTO location SET ?;', newLocation);
    db.query(query, defered.makeNodeResolver());
    return defered.promise;
  }
  q.all([locationQuery()]).then(function(results){
    var newEvent = {
      name: req.body.name,
      date: req.body.date,
      contactPhone: req.body.contactPhone,
      contactEmail: req.body.contactEmail,
      type: req.body.type,
      scope: req.body.scope,
      location_locationID: results[0][0].insertId,
      rso_rsoID: 1
    }
    let query = mysql.format(event_create_query, newEvent);
    db.query(query, function(error, results, fields) {
        console.log(error);
        console.log(results);
        console.log(fields);
        res.redirect('/event/' + results.insertId);
    });
  });
}

exports.event_list = function(req, res, db) {
  var query = mysql.format(event_list_query);
  db.query(query, function(error, results, fields){
      res.render('event_list',{title: 'Search Events','event_list': results});
  });
}
exports.event_details = function(req,res,db) {
  function eventQuery() {
    var defered = q.defer();
    var query = mysql.format(event_detail_query, [req.params.id]);
    db.query(query, defered.makeNodeResolver());
    return defered.promise;
  }
  q.all([eventQuery()]).then(function(results){
    let query = mysql.format('SELECT * FROM location WHERE locationID = ?;', [results[0][0][0].location_locationID]);
    db.query(query, function(error, results2, fields) {
        console.log(error);
        console.log(results2);
        console.log(fields);
        res.render('event_details', {title: 'Event', 'events': results[0][0], location: results2[0]});
    });
  });
}
