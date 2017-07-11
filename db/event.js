var http = require('http');
var mysql = require('mysql');
var q = require('Q');
var session = require('express-session');
var moment = require('moment');

let event_create_query = 'INSERT INTO event SET ?;';
let public_event_list_query = 'SELECT * FROM event WHERE scope = "Public" ORDER BY date';
let event_list_query = 'SELECT * FROM event;';
let event_detail_query = 'SELECT * FROM event WHERE eventID = ?;';

exports.index = function(req,res,db) {
  var query = mysql.format(public_event_list_query);
  db.query(query, function(error, results, fields){
      var user = 'Guest'
      if (session.fullname) user = session.fullname;
      res.render('index', {title: 'Welcome ' + user,'event_list': results});
  });
}
exports.event_create_get = function(req, res, db) {
    db.query('SELECT * FROM rso', function(error, results, fields) {
      (session.type === 'Admin') ?
      res.render('event_form', {title: 'Register Event!', rsos: results, authorized: 'authorized'}) :
      res.render('event_form', {title: 'Register Event!', rsos: results});
    });
}
exports.event_create_post = function (req, res, db) {
  function checkAdmin() {
    var defered = q.defer();
    db.query(mysql.format('SELECT user_adminID from rso where rsoID = ?;', [req.body.rso]), defered.makeNodeResolver());
    return defered.promise;
  }
  function checkConflicting() {
    var defered = q.defer();
    db.query(mysql.format('SELECT COUNT(*) as count FROM event e, location l WHERE e.location_locationID = l.locationID AND e.date = ? AND l.name = ?;', [req.body.date, req.body.locationName]), defered.makeNodeResolver());
    return defered.promise;
  }
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
  q.all([locationQuery(),checkAdmin(),checkConflicting()]).then(function(results){
    console.log(results[2][0][0].count);
    if (results[2][0][0].count > 0) {
      var string = 'Error: There is already an event at ' + req.body.locationName + ' during ' + req.body.date;
      res.render('warning', {warning: string});
    }
    else if (session.id !== results[1][0][0].user_adminID) {
      res.render('warning', {warning: 'Error: You can you only create events for RSOs you are admin of!'});
    }
    else {
      var newEvent = {
        name: req.body.name,
        date: req.body.date,
        contactPhone: req.body.contactPhone,
        contactEmail: req.body.contactEmail,
        type: req.body.type,
        scope: req.body.scope,
        location_locationID: results[0][0].insertId,
        rso_rsoID: req.body.rso
      }
      let query = mysql.format(event_create_query, newEvent);
      db.query(query, function(error, results2, fields) {
          res.redirect('/event/' + results2.insertId);
      });
    }
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
      let query = mysql.format('SELECT *,e.name as eventName, r.name as rsoName, l.name as locName FROM event e, rso r, location l WHERE eventID = ? AND e.rso_rsoID = r.rsoID AND e.location_locationID = l.locationID;', [req.params.id]);
      db.query(query, defered.makeNodeResolver());
      return defered.promise;
    }
    q.all([eventQuery()]).then(function(results){
      let query = mysql.format('SELECT * FROM comment,user WHERE event_eventID = ? AND userID = user_userID;', [results[0][0][0].eventID]);
      db.query(query, function(error, results2, fields) {
          session.id ?
          res.render('event_details', {title: 'Event', 'event': results[0][0][0], comments: results2}) :
          res.render('event_details', {title: 'Event', 'event': results[0][0][0], comments: results2, error: 'error'});
      });
    });
};
exports.event_details_post = function(req,res,db) {
  var newComment = {
    content: req.body.newcomment,
    event_eventID: req.params.id,
    user_userID: session.id
  }
  var query = mysql.format('INSERT INTO comment SET ?;', newComment);
  db.query(query, function(error,results,fields) {
    exports.event_details(req,res,db);
  });
};
exports.event_search_get = function(req,res,db) {
    function locationQuery() {
      var defered = q.defer();
      db.query('SELECT * FROM location;', defered.makeNodeResolver());
      return defered.promise;
    }
    function rsoQuery() {
      var defered = q.defer();
      db.query('SELECT * FROM rso;', defered.makeNodeResolver());
      return defered.promise;
    }
    q.all([locationQuery(),rsoQuery()]).then(function(results){
      res.render('event_search', {locations: results[0][0], rsos: results[1][0]});
    });

}
exports.event_search_post = function(req,res,db) {
  var string = 'SELECT * FROM event';
  var filters = [];
  if (req.body.location !== '' || req.body.scope !== '' || req.body.rso !== '') {
    string += ' WHERE ';
    if (req.body.location !== '') {
      string += 'event.location_locationID = ?'
      filters.push(req.body.location);
    }
    if (req.body.scope !== '') {
      if (string.endsWith('?')) string += ' AND ';
      string += 'event.scope = ?'
      filters.push(req.body.scope);
    }
    if (req.body.rso !== '') {
      if (string.endsWith('?')) string += ' AND ';
      string += 'event.RSO_rsoID = ?'
      filters.push(req.body.rso);
    }
  }
  string += ';';
  var query = mysql.format(string, filters);
  db.query(query, function(error, results, fields) {
    res.render('event_list', {title: 'Search Results!', event_list: results, filters: filters});
  });
}
