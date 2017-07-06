var http = require('http');
var mysql = require('mysql');
var location = require('./location');

let registerQuery = 'INSERT INTO event SET ?;';

exports.RSO_create_get = function(req, res, db) {
  res.send('NOT IMPLEMENTED: RSO create get');
}
exports.RSO_create_post = function(req, res, db) {
  var newEvent = {
    name: req.body.name,
    university_universityID: req.body.university,
    user_adminID: 1
  }
  let query = mysql.format(registerQuery, newEvent);
  db.query(query, function(error, results, fields) {
      console.log(error);
      console.log(results);
      console.log(fields);
  });
  res.redirect('/');
}
exports.RSO_list = function(req, res, db) {
  res.send('NOT IMPLEMENTED: Get RSO List');
}
