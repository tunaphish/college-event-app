var http = require('http');
var mysql = require('mysql');

let registerQuery = 'INSERT INTO user SET ?;';

exports.user_create_get = function(req, res, db) {
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
exports.user_detail = function(req,res, db) {
  res.send('NOT IMPLEMENTED: User Details')
}
