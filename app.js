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
app.use('/', require('./routes/index'));
//http requests
app.get('/', db.index);
app.get('/user/create', db.user_create_get);
app.post('/user/create', db.user_create_post);
app.get('/user/:id', db.user_details);
app.get('/RSO/create', db.RSO_create_get);
app.post('/RSO/create', db.RSO_create_post);
app.get('/RSO/:id', db.RSO_details);
app.get('/RSOs', db.RSO_list);
app.get('/event/create', db.event_create_get);
app.post('/event/create', db.event_create_post);
app.get('/events', db.event_list);


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
