var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

let mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/aie');
let mongodbUri = 'mongodb://hia:123456789o@ds239578.mlab.com:39578/aie_api';

mongoose.connect(mongodbUri,{useNewUrlParser:true});

let db = mongoose.connection;

db.on('error', function (err) {
  console.log('Unable to Connect to [ ' + db.name + ' ]', err);
});

db.once('open', function () {
  console.log('Successfully Connected to [ ' + db.name + ' ] ');
});

const artwork = require('./routes/artwork');
const admin = require('./routes/admin');
const member = require('./routes/member');

var app = express();
var port = process.env.PORT || 3001;
app.listen(port, function () {
  console.log("running at localhost:" + port);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use("*", function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With, token");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("Access-Control-Expose-Headers", "token");
  // res.header("x-auth-token",token);
  if (req.method === 'OPTIONS') {
    res.send(200)
  } else {
    next()
  }
});

//member operations

app.post('/member', member.signUp);
app.post('/member/:id', member.login);
// app.post('/member/:email', member.login);//for next phase
// app.post('/member/:phone', member.login);//for next phase
app.get('/member', member.findAll);
app.get('/member/:id', member.findOne);

//artwork operations

app.get('/artwork', artwork.findAll);
app.get('/artwork/:id', artwork.findOne);
app.get('/artwork/view_times', artwork.findSumOfViewTimes);
app.post('/artwork', artwork.addArtwork);
app.delete('/artwork/:id', artwork.removeArtwork);//user和admin都可以操作
app.put('/artwork/:id/visit_times', artwork.updateViewTimes);


//administrator operations
app.put('/member', admin.addMember);
app.delete('/artwork/:id', artwork.removeArtwork);
app.delete('/member/:id', member.deleteMember);
app.get('/admin/:id', admin.findOne);
app.get('/admin', admin.findAll);

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
