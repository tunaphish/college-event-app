var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var db = require('./db/db');
var app = express();
var router = express.Router();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//routing middleware
//app.use('/', require('./routes/index'));
//http requests
app.get('/', db.index);
app.get('/user/login', db.user_login_get);
app.post('/user/login', db.user_login_post);
app.get('/user/create', db.user_create_get);
app.post('/user/create', db.user_create_post);
app.get('/user/:id', db.user_details);
app.get('/RSO/create', db.RSO_create_get);
app.post('/RSO/create', db.RSO_create_post);
app.get('/RSO/:id', db.RSO_details);
app.post('/RSO/:id', db.RSO_details_post);
app.get('/RSOs', db.RSO_list);
app.get('/event/create', db.event_create_get);
app.post('/event/create', db.event_create_post);
app.get('/event/search', db.event_search_get);
app.post('/event/search', db.event_search_post);
app.get('/event/:id', db.event_details);
app.post('/event/:id', db.event_details_post);
app.get('/events', db.event_list);
app.get('/comment/:id', db.comment_details);
app.post('/comment/:id', db.comment_details_post);
app.get('/university/create', db.university_create_get);
app.post('/university/create', db.university_create_post);
app.get('/university/:id', db.university_details);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
