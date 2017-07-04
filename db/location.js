var http = require('http');
var mysql = require('mysql');

let registerQuery = 'INSERT INTO user SET ?;';

function addLocation(req, res, db) {
  var newUser = {
    longitude: req.body.longitude,
    latitude: req.body.latitude
  }
  let query = mysql.format(registerQuery, newUser);
  db.query(query, function(error, results, fields) {
      console.log(error);
      console.log(results);
      console.log(fields);
  });
  res.redirect('/');
}
exports.addLocation = addLocation;
