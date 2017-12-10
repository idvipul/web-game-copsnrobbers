var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');

var index = require('./routes/index');
var users = require('./routes/users');
var tests = require('./routes/tests');
var signup = require('./routes/signup');
var login = require('./routes/signin');
var userstest = require('./routes/userstest');

if(process.env.NODE_ENV === 'development') {
require("dotenv").config();
}

var app = express();
// call socket.io to the app
app.io = require('socket.io')();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized: true})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

//Models
var models = require("./models");

//Routes
var authRoute = require('./routes/auth.js')(app,passport);

//load passport strategies
require('./config/passport/passport.js')(passport, models.user);

//Sync Database
models.sequelize.sync().then(function() {
    console.log('Nice! Database looks fine')
}).catch(function(err) {
    console.log(err, "Something went wrong with the Database Update!")
});

app.use(express.static(path.join(__dirname, 'public')));
app.use('/img',express.static(path.join(__dirname, 'public/images')));
app.use('/js',express.static(path.join(__dirname, 'public/javascripts')));
app.use('/css',express.static(path.join(__dirname, 'public/stylesheets')));

app.use('/', index);
app.use('/users', users);
app.use('/tests', tests);
app.use('/signup', signup);
app.use('/login', login);
app.use('/userstest', userstest);

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

// start listen with socket.io
app.io.on('connection', function(socket){
    console.log('a user connected');

    // socket.on('new message', function(msg){
    //     app.io.emit('chat message', msg);
    // });

    socket.on('player move', function(move){
        socket.broadcast.emit('new move', move);
    });

    socket.on('on powerup', function(position){
        app.io.emit('powerup taken', position);
    });

    // socket.on('on exit tile', function(position){
    //     // if conditions met{
    //     app.io.emit('player finished', position);
    //   // }
    // });

    // socket.on('on bank tile', function(position){
    //   // if conditions not yet met{
    //     app.io.emit('robbery in progress', position);
    //     // }
    // });

    // socket.on('all seeing eye', function(position){
    //     //
    //     // tell all players to send their (every or current) move
    //     // this sicket will have to activate another or a callback for just current
    //
    //     app.io.emit('powerup taken', position);
    // });

    // socket.on('invisible', function(position){
    // THIS POWERUP MIGHT HAVE TO BE ACCOUNTED FOR IN THE REGULAR SEND MOVE FUNCTION
    //     app.io.emit('powerup taken', position);
    // });
})

module.exports = app;
