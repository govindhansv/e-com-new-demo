var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var userRouter = require('./routes/user');
var adminRouter = require('./routes/admin');
var hbs=require('express-handlebars')
var session=require('express-session')

var app = express();
var fileUpload=require('express-fileupload')
var db=require('./config/connection')
var handlebars=require('handlebars')
var moment = require('moment')


// view engine setup
app.set('views', path.join(__dirname, 'views-new'));
app.set('view engine', 'hbs');
app.engine('hbs',hbs({extname:'hbs',defaultLayout:'layout',layoutsDir:__dirname+'/views-new/layout/',partialsDir:__dirname+'/views-new/partials/'}))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload())
app.use(session({secret:"key",resave: false, saveUninitialized: true,cookie:{maxAge:100000000000000}}))


db.connect((err)=>{
  if(err)
  console.log('Connection Error'+err);
  else
  console.log('Database Connected');
})

app.use('/', userRouter);
app.use('/admin', adminRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

handlebars.registerHelper("formatDate", function (date, format) {
  if (moment) {
    format = moment[format] || format;
    return moment(date).format(format);
  } else {
    return datetime;
  }
});

module.exports = app;
