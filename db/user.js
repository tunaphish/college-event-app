var http = require('http');
var mysql = require('mysql');

let user_create_query = 'INSERT INTO user SET ?;';
let user_detail_query = 'SELECT * FROM user WHERE userID = ?;';

exports.user_create_get = function(req, res, db) {
  res.render('user_form', {title: 'Sign up!'})
}
exports.user_create_post = function(req, res, db) {
  //Validate & Sanitize
  //Run validator
  //Create object w/ data
  //Check for errors and reload page with data
  //Check if User exists
  //Redirect to user details page u
  var newUser = {
    emailAddress: req.body.email,
    password: req.body.password,
    type: 'Student',
    university_universityID: 1
  }
  let query = mysql.format(user_create_query, newUser);
  db.query(query, function(error, results, fields) {
      console.log(error);
      console.log(results);
      console.log(fields);
      res.redirect('/user/' + results.insertId);
  });
}
exports.user_details = function(req,res, db) {
  var query = mysql.format(user_detail_query, [req.params.id]);
  db.query(query, function(error, results, fields){
    console.log(results);
      res.render('user_details',{title: 'Welcome','users': results});
  });
}
