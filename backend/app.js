var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const history = require("connect-history-api-fallback");

const indexRouter = require('./routes/index');
const notionRouter = require("./routes/notion");
const kinderRouter = require("./routes/kinder");

const app = express();

// view engine setup
app.set('views', path.join(__dirname, '/'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/project', notionRouter);
app.use('/note', notionRouter);
app.use("/kinder", express.static(path.join(__dirname, "public/project/kinderfest")));
app.use("/kinder/*", kinderRouter);

app.use(history());
// SPA reload error modify
app.get('*', (req, res) => {
  const original_url = req.originalUrl;
  let dir = "/";
  
  if(original_url.includes("kinder")) {
    dir = "/project/kinderfest/";
  } else {
    dir = "/";
  }
  res.sendFile(path.join(__dirname + `/public${dir}index.html`));
});

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
