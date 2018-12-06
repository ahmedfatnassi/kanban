var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var flash=require("connect-flash");
var baseDIR = require('../../model/user');
var expressValidator = require('express-validator');
var ensureauthenticated = require('../../tools/tools');

/* GET users listing. */
router.use(flash());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(expressValidator());

router.get('/',function(req,res,next){
   res.send('respond with a resource');
});

router.get('/register',ensureauthenticated.ensureAuthenticated, function (req, res, next) {
    res.render('user/register', {title: 'register', layout: 'layout'});
});
router.get('/',ensureauthenticated.ensureAuthenticated, function (req, res, next) {
    res.render('index', {title: 'index',layout:'layout'});
});





/*router.post('/register', function (req, res,next) {


    var name = req.body.username;// name='name' in jade file
    var email2 = req.body.email;
    var password6 = req.body.password;
    //var passwordm = req.body.password2;
    console.log("post received: %s ",  email2);

///check for image field
//if(req.files) {
    //file info
    /*
        var profileImageOriginalName = req.files.profileimage.originalname;
        var profileImageName = req.files.profileimage.name;
        var profileImageMime = req.files.profileimage.mimeType;
        var profileImagePath = req.files.profileimage.Path;
        var profileImageExt = req.files.profileimage.extensions;
        var profileImageSize = req.files.profileimage.size;*/
//}else{
/// set default
//var profileimagename ='./public/images/noImage.png'
    //  }
   /* req.checkBody('name', 'namefiel is required').notEmpty();//make sure that field is not emty
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('username', 'username is required').notEmpty();
    req.checkBody('password', 'password field is required').notEmpty();
    req.checkBody('passwordm', 'zertyuiop').equals(req.body.password);

    const errors = req.validationError();

    if (errors) {
        res.render('register', {
            errors: req,
            name: name,
            email: email,
            //usernale: username,
            password: password,
            passwordm: password2
        });

    } else {
        var newuser = new User({
            name: name,
            email: email,
            //  username: username,
            password: password,
            // profileimage:profileImageName
        });

        user.createUser(newuser, function (err, user) {
            if (err) throw err;
            console.log(user);
        });

        req.flash('sucess', 'you are now fucking registered');
        res.location('/');
        res.redirect('/');
    }


});*/
router.post('/register',ensureauthenticated.ensureAuthenticated, function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    var password2 = req.body.password2;
    var email = req.body.email;
    var isadmin= req.body.admin ;
    console.log("admin "+isadmin);
    var thisisadmin =false ;
    if(isadmin=="on"){  // when box was checked this will  return on then i create this var  pars the value
        thisisadmin=true ;
    }

    req.checkBody('username', 'Username is required!').notEmpty();
    req.checkBody('password', 'Password is required!').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('password2', 'Passwords do not match!').equals(password);

    var errors = req.validationErrors();

    if (errors) {
        return res.render(baseDIR + 'addUser', {
            title: 'Add User',
            layout: 'dashboardLayout',
            errors: errors

        });
    } else {
        var newuser = new baseDIR({
            username: username,
            password: password,
            email: email,
            admin:thisisadmin
        });

        baseDIR.createUser(newuser, function (err, user) {
            if (err) throw err;
            console.log(user);
        });

        //req.flash('sucess', 'you are now fucking registered');
        res.location('/');
        res.redirect('/');
    }

});

module.exports = router;
