var createError = require('http-errors');
var express = require('express');
var indexRouter =  require('./routes/API/index');
var usersRouter = require('./routes/API/users');
var boardsRouter = require('./routes/API/boards');
var settingsRouter =require('./routes/API/settings');
var BoardRouter =require('./routes/API/board');
var publicRouter = require('./routes/login');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var expressValidator = require('express-validator');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var passport = require('passport');
var helmet= require("helmet") ;
var LocalStrategy = require('passport-local').Strategy;
var multer = require('multer');
var flash = require('connect-flash');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var db = mongoose.connection;


var app = express();




app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'jade');
app.use(helmet());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(session({
    secret: 'fatnassisecret',
    saveUninitialized: true,
    resave: true
}));
//passport
app.use(passport.initialize());
app.use(passport.session()) ;

app.use(expressValidator({
    errorFormatter: function (param, msg, value) {
        var namespace = param.split('.')
            , root = namespace.shift()
            , formParam = root;
        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        }
    }
}));


app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));





/// handle file uploads
app.use(multer({dest:__dirname+'/file/uploads/'}).any());



app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(flash());
app.use(function (req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
});
app.use('/index', indexRouter);
app.use('/settings', settingsRouter);
app.use('/users', usersRouter);
app.use('/board', BoardRouter);
app.use('/boards', boardsRouter);
app.use('/', publicRouter);

app.use('*',function (req,res,next) {//*=every where
 res.locals.user=req.user||null ;
 next() ;
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
  res.status(err.statfeus || 500);
  res.render('error');
});

module.exports = app;
