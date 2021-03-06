var mysql = require('mysql');
var user = require('./user');
var event = require('./event');
var rso = require('./rso');
var comment = require('./comment');
var university = require('./university');

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
});

exports.index = (req,res) => event.index(req,res,db);
exports.user_login_get = (req,res) => user.user_login_get(req,res,db);
exports.user_login_post = (req,res) => user.user_login_post(req,res,db);
exports.user_create_get = (req,res) => user.user_create_get(req,res,db);
exports.user_create_post = (req,res) => user.user_create_post(req,res,db);
exports.user_details = (req,res) => user.user_details(req,res,db);
exports.RSO_create_get = (req,res) => rso.RSO_create_get(req,res,db);
exports.RSO_create_post = (req,res) => rso.RSO_create_post(req,res,db);
exports.RSO_list = (req,res) => rso.RSO_list(req,res,db);
exports.RSO_details = (req,res) => rso.RSO_details(req,res,db);
exports.RSO_details_post = (req,res) => rso.RSO_details_post(req,res,db);
exports.event_create_get = (req,res) => event.event_create_get(req,res,db);
exports.event_create_post = (req,res) => event.event_create_post(req,res,db);
exports.event_list = (req,res) => event.event_list(req,res,db);
exports.event_details = (req,res) => event.event_details(req,res,db);
exports.event_details_post = (req,res) => event.event_details_post(req,res,db);
exports.event_search_get = (req,res) => event.event_search_get(req,res,db);
exports.event_search_post = (req,res) => event.event_search_post(req,res,db);
exports.comment_details = (req,res) => comment.comment_details(req,res,db);
exports.comment_details_post = (req,res) => comment.comment_details_post(req,res,db);
exports.university_create_get = (req,res) => university.university_create_get(req,res,db);
exports.university_create_post = (req,res) => university.university_create_post(req,res,db);
exports.university_details = (req,res) => university.university_details(req,res,db);
