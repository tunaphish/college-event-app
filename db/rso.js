var http = require('http');
var mysql = require('mysql');
var q = require('Q');
var session = require('express-session');

let rso_create_query = 'INSERT INTO rso SET ?;';
let rso_list_query = 'SELECT * FROM rso';
let rso_detail_query = 'SELECT * FROM rso WHERE rsoID = ?;';

exports.RSO_create_get = function(req, res, db) {
  if (!session.id) res.render('rso_form', {error: 'Please login to create RSO!'});
  function universityQuery() {
    var defered = q.defer();
    db.query('SELECT * from university;', defered.makeNodeResolver());
    return defered.promise;
  }
  function userQuery() {
    var defered = q.defer();
    db.query('SELECT * from user;', defered.makeNodeResolver());
    return defered.promise;
  }
  q.all([universityQuery(),userQuery()]).then(function(results){
        res.render('rso_form', {title: 'Register RSO!', universities: results[0][0], userID: session.id, name: session.fullname});
  });
}
exports.RSO_create_post = function(req, res, db) {
  var newEvent = {
    name: req.body.name,
    university_universityID: req.body.university,
    user_adminID: req.body.admin
  }
  let query = mysql.format(rso_create_query, newEvent);
  db.query(query, function(error, results, fields) {
      console.log(error);
      console.log(results);
      console.log(fields);
      res.redirect('/RSO/' + results.insertId);
  });
}
exports.RSO_list = function(req, res, db) {
  var query = mysql.format(rso_list_query);
  db.query(query, function(error, results, fields){
      res.render('rso_list',{title: 'RSO List','rso_list': results, });
  });
}
exports.RSO_details = function(req,res,db) {
  var query = mysql.format(rso_detail_query, [req.params.id]);
  console.log(query);
  db.query(query, function(error, results, fields){
      console.log(results);
      res.render('rso_details',{title: 'RSO','rso': results});
  });
}
