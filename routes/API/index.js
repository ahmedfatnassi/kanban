var express = require('express');
var router = express.Router();
var flash = require('connect-flash');
var ensureauthenticated = require('../../tools/tools') ;
var session = require('express-session');

router.use(flash());

router.get('/logout',function (req,res) {
    req.logout() ;
  //  req.flash('succsss','you have logged out');
    res.redirect('/login');
});
router.get('/',ensureauthenticated.ensureAuthenticated, function (req, res, next) {
    res.render('index', {title: 'index',layout:'layout'});
});
module.exports = router;
