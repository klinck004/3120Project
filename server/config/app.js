/* Env config */
require('dotenv').config();
if (process.env.NODE_ENV === 'development'){
  console.log("In development environment")
}

/* General dependencies */
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

/* Authentication */
let session = require('express-session');
let passport = require('passport');
let passportLocal = require('passport-local');
let localStrategy = passportLocal.Strategy;
let flash = require('connect-flash');
// Setup User model
let userModel = require('../models/user');
let User = userModel.User;

// Router variable declaration
var indexRouter = require('../routes/index');
var usersRouter = require('../routes/users');
let musicRouter = require('../routes/music')

// Mongoose initialization and database connection
let DB = require('./db'); // For MongoDB connection
let mongoose = require('mongoose');
let mongoDB = mongoose.connection;

mongoose.connect(DB.URI).catch(error => console.log("MongoDB connection error: " + error));
mongoDB.once('open',()=>{console.log("MongoDB is connected")});

// Express //
var app = express();


// Further auth setup
// Session setup
app.use(session({
  secret:"SomeSecret",
  saveUninitialized:false,
  resave:false
}));

// Flash setup
app.use(flash());

// Setup user authentication strategy
passport.use(User.createStrategy());

// Authentication -- Passport setup
app.use(passport.initialize());
app.use(passport.session());

// User info serialization/deserialization
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Access static files
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/music', musicRouter);

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

module.exports = app;
