var http = require('http');
var mysql = require('mysql');

let registerQuery = 'INSERT INTO user SET ?;';
let user_detail_query = 'SELECT * FROM user WHERE userID = ?;';

exports.user_create_get = function(req, res, db) {
  //Validate & Sanitize
  //Run validator
  //Create object w/ data
  var newUser = {
    emailAddress: req.body.email,
    password: req.body.password,
    type: 'Student',
    university_universityID: 1
  }
  //Check for errors and reload page with data
  //Check if User exists



  res.send('NOT IMPLEMENTED: User create get');
}
exports.user_create_post = function(req, res, db) {
  var newUser = {
    emailAddress: req.body.email,
    password: req.body.password,
    type: 'Student',
    university_universityID: 1
  }
  let query = mysql.format(registerQuery, newUser);
  db.query(query, function(error, results, fields) {
      console.log(error);
      console.log(results);
      console.log(fields);
  });
  res.redirect('/');
}
exports.user_details = function(req,res, db) {
  var query = mysql.format(user_detail_query, [req.params.id]);
  db.query(query, function(error, results, fields){
    console.log(results);
      res.render('user_details',{title: 'Welcome','users': results});
  });
}
