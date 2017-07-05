var http = require('http');
var mysql = require('mysql');
var location = require('./location');

let registerQuery = 'INSERT INTO event SET ?;';

function addRSO(req, res, db) {
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
exports.addRSO = addRSO;
