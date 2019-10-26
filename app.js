var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
// var bodyParser = require('body-parser');
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
const auth = require('./middleware/check-auth');

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

app.post('/member/signup', member.signUp);// ok
app.post('/member/login', member.login);// ok
// app.post('/member/:email', member.login);//for next phase
// app.post('/member/:phone', member.login);//for next phase
app.get('/member', member.findAll);// ok
app.get('/member/:email', member.findOne);// ok
app.put('/member/changePassword/:member', auth.authMember,member.changePassword);// ok
//app.post('/artwork', member.comment);for next phase
//app.delete('/artwork', member.recallComment);for next phase
//app.get('/member/:id', member.subscriberList);for next phase
//app.put('/member/:id/subscriber_list', member.follow);for next phase
//app.get('/member/:id', member.getFollowerList);for next phase
//app.delete('/member/:id/subscribers', member.removeSubscriber);for next phase
//app.delete(''/member/:id/subscribers', member.unfollow);for next phase

//artwork operations

app.get('/artwork', artwork.findAll);// ok
app.get('/artwork/:id', artwork.findOne);// ok
app.get('/artwork/viewtimes', artwork.findSumOfViewTimes);
app.put('/artwork/:id/view_times', artwork.updateViewTimes);
app.post('/artwork', artwork.addArtwork);// ok
app.delete('/artwork/:id', artwork.removeArtwork);//user和admin都可以操作 //ok

//app.post('/artwork', artwork.addPicture);for next phase
// app.post('/artwork', artwork.addVideo);for next phase
//app.post('/artwork', artwork.addComment);for next phase
//app.get('/artwork/datasize', artwork.retrieveSize;for next phase



//administrator operations

app.post('/admin/login', admin.login);//ok
app.post('/member', admin.addMember);
app.get('/artwork/:id', artwork.findOne);//ok
// app.delete('/artwork/:id', artwork.removeArtwork);//ok
app.delete('/:admin/member/:email', auth.authAdmin,member.deleteMember);//ok
app.get('/admin/:email', admin.findOne);//ok
app.get('/admin', admin.findAll);//ok
//app.delete('/artwork', admin.recallComment);for next phase
// app.delete('/artwork', admin.removeComment);for next phase

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