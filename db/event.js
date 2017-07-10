var http = require('http');
var mysql = require('mysql');
var q = require('Q');
var session = require('express-session');

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
      let query = mysql.format('SELECT * FROM event WHERE eventID = ?;', [req.params.id]);
      db.query(query, defered.makeNodeResolver());
      return defered.promise;
    }
    q.all([eventQuery()]).then(function(results){
      console.log(results[0][0][0]);
      let query = mysql.format('SELECT * FROM comment WHERE event_eventID = ?;', [results[0][0][0].eventID]);
      console.log(query);
      db.query(query, function(error, results2, fields) {
          console.log(error);
          console.log(results2);
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
    console.log(error);
    console.log(results);
    console.log(fields);
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
      console.log(results);
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
  console.log(filters);
  console.log(query);
  db.query(query, function(error, results, fields) {
    console.log(error);
    console.log(results);
    res.render('event_list', {title: 'Search Results!', event_list: results, filters: filters});
  });
}
