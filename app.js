require("dotenv").config()
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('./mongo')

const cookieSession = require('cookie-session');

const userRouter = require("./routes/userRoute");
const imageRouter = require ("./routes/imageRoute");

var app = express();


app.use(
  cookieSession({
    name: "google-auth-session",
    keys: ["key1", "key2"],
  })
);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join("uploads", '../public')));


app.use('/image',imageRouter);
app.use('/users',userRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
// Getting App 

app.use(cookieSession({
  name: 'google-auth-session',
  keys: ['key1', 'key2']
}))


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('error',err.message);
});



module.exports = app