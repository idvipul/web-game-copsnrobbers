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
var signin = require('./routes/signin');
var userstest = require('./routes/userstest');
var createNewGame = require('./routes/createNewGame');
var game = require('./routes/game');
var dashboard = require('./routes/dashboard');
var joinGame = require('./routes/joinGame');

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

app.use('/', signin);
app.use('/users', users);
app.use('/tests', tests);
app.use('/signup', signup);
app.use('/signin', signin);
app.use('/userstest', userstest);
app.use('/createNewGame', createNewGame);
app.use('/game', game);
app.use('/joinGame', joinGame);

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

    socket.on('joined room', function (gameid){
      var room = gameid;
      socket.join(room);
    });

    socket.on('player move', function(move, gameid){
        socket.to(gameid).emit('new move', move);
    });

    socket.on('on powerup', function(position, gameid){
        socket.in(gameid).emit('powerup taken', position, gameid);
    });

    socket.on('robbing bank', function(gameId){
        app.io.in(gameId).emit('bank robbed');
    });

    socket.on('game over', function(gameId, winnerId, winnerType){
        app.io.in(gameId).emit('game finished', gameId, winnerId, winnerType);
    });

    // chat --dashboard
    socket.on('new message', function(msg){
        app.io.emit('chat message', msg);
    });

    // chat room
    socket.on('new message2', function(msg, gameid){
        app.io.in(gameid).emit('chat message2', msg);
    });

    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
});

module.exports = app;
