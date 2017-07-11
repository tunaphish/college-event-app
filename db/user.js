var http = require('http');
var mysql = require('mysql');
var session = require('express-session');

let user_create_query = 'INSERT INTO user SET ?;';
let user_detail_query = 'SELECT * FROM user WHERE userID = ?;';

exports.user_login_get = function(req,res,db) {
  res.render('user_login', {title: 'Login'});
}
exports.user_login_post = function(req,res,db) {
  var query = mysql.format('SELECT * FROM user WHERE emailAddress = ?;', req.body.email);
  db.query(query, function(error, results, fields) {
    console.log(error);
    console.log(results);
    console.log(fields);
    if (results[0] && results[0].password === req.body.password) {
      session.id = results[0].userID;
      session.emailAddress = results[0].emailAddress;
      session.type = results[0].type;
      session.fullname = results[0].firstname + ' ' + results[0].lastname;
      res.redirect('/');
    }
    else {
      res.render('user_login', {error: 'E-mail not found or password incorrect!'});
    }
  });
}

exports.user_create_get = function(req, res, db) {
  console.log(db.query('SELECT * FROM university'));
  db.query('SELECT * FROM university', function(error, results, fields) {
    res.render('user_form', {title: 'Sign up!', universities: results});
  });
}
exports.user_create_post = function(req, res, db) {
  var newUser = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    emailAddress: req.body.email,
    password: req.body.password,
    type: 'Student',
    university_universityID: req.body.university
  }
  let query = mysql.format(user_create_query, newUser);
  db.query(query, function(error, results, fields) {
    session.id = results.insertId;
    session.emailAddress = req.body.email;
    session.type = req.body.type;
    session.fullname = req.body.firstname + ' ' + req.body.lastname;
    res.redirect('/');
  });
}
exports.user_details = function(req,res, db) {
  var query = mysql.format(user_detail_query, [req.params.id]);
  db.query(query, function(error, results, fields){
    console.log(results);
      res.render('user_details',{title: 'Welcome','users': results});
  });
}
