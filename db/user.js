var http = require('http');
var mysql = require('mysql');

let registerQuery = 'INSERT INTO user SET ?;';

function registerNewUser(req, res) {
  var db = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'newpass',
      database: 'siteDB'
  });
  db.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
    console.log('connected as id ' + db.threadId);
  });
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
