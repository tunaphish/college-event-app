var http = require('http');
var mysql = require('mysql');
var q = require('Q');
var session = require('express-session');

exports.university_create_get = function(req,res,db) {
  (session.type === 'Super Admin') ?
  res.render('university_form', {title: 'Create University!'}) :
  res.render('university_form', {title: 'Create University!', error: 'You must be a Super Admin to create a University!'});
}
exports.university_create_post = function(req,res,db) {
  function locationQuery() {
    var defered = q.defer();
    var newLocation = {
      name: req.body.locationName,
      longitude: req.body.locationLng,
      latitude: req.body.locationLat
    }
    let query = mysql.format('INSERT INTO location SET ?;', newLocation);
    db.query(query, defered.makeNodeResolver());
    return defered.promise;
  }
  q.all([locationQuery()]).then(function(results){
    var newUniversity = {
      name: req.body.name,
      numStudents: req.body.numStudents,
      location_locationID: results[0][0].insertId,
    }
    let query = mysql.format('INSERT INTO university SET ?;', newUniversity);
    db.query(query, function(error, results, fields) {
        console.log(error);
        console.log(results);
        res.redirect('/university/' + results.insertId);
    });
  });
}
exports.university_details = function(req,res,db) {
  let query = mysql.format('SELECT u.name AS uniname, u.numStudents as numStudents, l.name as locName FROM university u ,location l WHERE u.universityID = ? AND l.locationID = u.location_locationID;', [req.params.id]);
  db.query(query, function(error, results, fields) {
      console.log(error);
      console.log(results);
      res.render('university_details', {title: 'University', 'university': results[0]});
  });
}
