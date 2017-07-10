var http = require('http');
var mysql = require('mysql');
var session = require('express-session');

exports.comment_details = function(req,res,db) {
    let query = mysql.format('SELECT * FROM comment,user WHERE commentID = ? AND user_userID = userID;', [req.params.id]);
    db.query(query, function(error, results, fields) {
        session.id === results[0].userID ?
        res.render('comment_details', {'comment': results[0],  authorized: 'authorized'}) :
        res.render('comment_details', {'comment': results[0]});
    });
};
exports.comment_details_post = function(req,res,db) {
  var query;
  req.body.button === 'delete' ?
  query =  mysql.format('DELETE FROM comment WHERE commentID = ?;', [req.params.id]) :
  query =  mysql.format('UPDATE comment SET content = ? WHERE commentID = ?;', [req.body.content, req.params.id]);
  db.query(query, function(error,results,fields) {
    console.log(error);
    console.log(results);
    var url = session.prevEvent || '/'
    res.redirect(url);
  });
}
