var http = require('http');
var mysql = require('mysql');
var q = require('Q');
var session = require('express-session');

let rso_create_query = 'INSERT INTO rso SET ?;';
let rso_list_query = 'SELECT r.rsoID as rsoID, r.name as rsoName, r.active as active, u.name as uniName FROM rso r, university u WHERE u.universityID = r.university_universityID';
let rso_detail_query = 'SELECT *, u.name as uniName, r.name as name FROM rso r,students_rso s,university u WHERE r.rsoID = ? AND u.universityID = r.university_universityID;';

exports.RSO_create_get = function(req, res, db) {
  if (!session.id) res.render('rso_form', {error: 'Please login to create RSO!'});
  else {
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
}
exports.RSO_create_post = function(req, res, db) {
  var newRSO = {
    name: req.body.name,
    active: 'inactive',
    university_universityID: req.body.university,
    user_adminID: req.body.admin
  }
  let query = mysql.format(rso_create_query, newRSO);
  db.query(query, function(error, results, fields) {
      console.log(error);
      console.log(results);
      res.redirect('/RSO/' + results.insertId);
  });
}
exports.RSO_list = function(req, res, db) {
  var query = mysql.format(rso_list_query);
  db.query(query, function(error, results, fields){
      res.render('rso_list',{title: 'RSO List','rso_list': results});
  });
}
exports.RSO_details = function(req,res,db) {
  var query = mysql.format(rso_detail_query, [req.params.id]);
  db.query(query, function(error, results, fields){
      console.log(results);
      var rendered = false;
      if (!session.id) {
        res.render('rso_details',{title: 'RSO',rso: results, error: 'Please login to join an RSO'});
        rendered = true;
      }
      else {
        for (var i in results) {
          if (results[i].user_userID === session.id) {
            res.render('rso_details', {title: 'RSO', rso:results, error: 'You are a member of this RSO'});
            rendered = true;
            break;
          }
        }
      }
      if (!rendered) res.render('rso_details',{title: 'RSO',rso: results});
  });
}
exports.RSO_details_post = function(req,res,db) {
  var member = {
    user_userID: session.id,
    RSO_rsoID: req.params.id
  }
  var query = mysql.format('INSERT INTO students_rso set ?;', member);
  db.query(query, function(error, results, fields) {
    console.log(results);
    exports.RSO_details(req,res,db);
  })
}
