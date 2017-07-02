var http = require('http');
var mysql = require('mysql');

let registerQuery = 'INSERT INTO user SET ?;';

function registerNewUser(req, res, db) {
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
      res.send(newUser);
  });
}
exports.registerNewUser = registerNewUser;
