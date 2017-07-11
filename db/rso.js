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
  //Change user into admin
  db.query(mysql.format('UPDATE user SET type = "Admin" WHERE userID = ?;', [req.body.admin]));
  function rsoQuery() {
    var defered = q.defer();
    var newRSO = {
      name: req.body.name,
      active: 'inactive',
      university_universityID: req.body.university,
      user_adminID: req.body.admin
    }
    db.query(mysql.format(rso_create_query, newRSO), defered.makeNodeResolver());
    return defered.promise;
  }
  q.all([rsoQuery()]).then(function(results){
    var studentRSO = {
      user_userID: req.body.admin,
      RSO_rsoID: results[0][0].insertId
    }
    db.query(mysql.format('INSERT INTO students_rso SET ?;', studentRSO), function(error,results2,fields){
      res.redirect('/RSO/' + results[0][0].insertId);
    });
  });
}
exports.RSO_list = function(req, res, db) {
  var query = mysql.format(rso_list_query);
  db.query(query, function(error, results, fields){
      res.render('rso_list',{title: 'RSO List','rso_list': results});
  });
}
exports.RSO_details = function(req,res,db) {
  function rsoQuery() {
    var defered = q.defer();
    db.query(mysql.format('SELECT *, r.name as name, u.name as uniName FROM rso r, university u WHERE rsoID = ? AND university_universityID = universityID;', [req.params.id]), defered.makeNodeResolver());
    return defered.promise;
  }
  q.all([rsoQuery()]).then(function(results){
    if (!session.id) {
      res.render('rso_details',{title: 'RSO',rso: results[0][0], error: 'Please login to join an RSO'});
    }
    else {
      let query = mysql.format('SELECT COUNT(*) as count from students_rso WHERE user_userID = ? AND RSO_rsoID = ?;', [session.id, req.params.id]);
      db.query(query, function(error,results2,fields){
        if (results2[0].count > 0){
          res.render('rso_details', {title: 'RSO', rso:results[0][0], authorized: 'authorized'});
        }
        else {
          res.render('rso_details',{title: 'RSO',rso: results[0][0]});
        }
      });
    }
  });

}
exports.RSO_details_post = function(req,res,db) {
  if (req.body.button === 'leave') {
    db.query(mysql.format('DELETE FROM students_rso WHERE user_userID = ? AND RSO_rsoID = ?;', [session.id,req.params.id]));
  }
  else {
    let member = {
      user_userID: session.id,
      RSO_rsoID: req.params.id
    }
    db.query(mysql.format('INSERT INTO students_rso set ?;', member));
  }
  db.query(mysql.format('SELECT COUNT(*) as count FROM students_rso WHERE RSO_rsoID = ?;', [req.params.id]), function(error,results,fields) {
    let activity = results[0].count > 4 ? 'active' : 'inactive';
    console.log(activity);
    db.query(mysql.format('UPDATE rso SET active = ? WHERE rsoID = ?;', [activity, req.params.id]), function(error,results,fields) {
      console.log(results);
    });
    exports.RSO_details(req,res,db);
  });
}
