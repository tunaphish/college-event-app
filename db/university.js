var http = require('http');
var mysql = require('mysql');

let retrieveQuery = "SELECT universityID,name FROM university";

function getUniversities(req, res, db) {
  let query = mysql.format(retrieveQuery);

  db.query(query, function(error, results, fields){
      var ret = [];
      for(var uni of results) {
          ret.push(uni);
      }
      return ret;
  });
}
exports.getUniversities = getUniversities;
