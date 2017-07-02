var mysql = require('mysql');
var user = require('./user');

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

exports.registerNewUser = (req,res) => user.registerNewUser(req,res,db);
