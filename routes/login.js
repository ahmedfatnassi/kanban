var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var flash=require("connect-flash");
var passport = require('passport');
var expressValidator = require('express-validator');
var session = require('express-session');
var baseDIR = require('../model/user');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../model/user');

router.get('/login', function (req, res, next) {
    res.locals.success = res.message;
    res.render('login', {title: 'login',layout:'layout',user:'user'});
});

/*router.get('/login', function (req, res, next) {
    if ((req.isAuthenticated())) {
        return res.redirect('/users/layout');
    } else {
        return res.render('/login', {
            title: 'Sign in',
            layout: 'layout'
        });
    }
});*/

passport.serializeUser(function (user, done) {
    return done(null, user.id); // serialisation just take just id and stored on the session
});

passport.deserializeUser(function (id, done) {      //  retrieve the user form and store it on the session
    User.findById(id, function (err, user) {
        return done(err, user);
    });
});



passport.use('local', new LocalStrategy(function (username, password, done) {
    User.getUserByUsername(username, function (err, user) {
        if (err) throw err;
        if (!user) {
            console.log('Unknown user!');
            return done(null, false, {message: 'Unknown user!'});
        }
        User.comparePassword(password, user.password, function (err, isMatch) {
            if (err) throw err;
            if (isMatch) {
                return done(null, user);
            } else {
                console.log('Invalid password!');
                return done(null, false, {message: 'Invalid password!'});
            }
        });
    })
}));
router.get('/',function (req,res) {
   res.redirect('/login');
   res.location('/login');
});
router.get('/updateitem',function (req,res) {
res.send("succrherehetess");
console.log("requist"+req) ;
});
router.post('/login', passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: 'Invalid username or password!'
}, null), function (req, res) {
    console.log('Logged in successfully');
    req.flash('success', 'Logged in successfully!');
    console.log("login success") ;
    return res.redirect('/boards/');
});

module.exports = router;