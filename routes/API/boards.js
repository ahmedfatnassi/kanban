var express = require('express');
var router = express.Router();
var flash = require('connect-flash');
var ensureauthenticated = require('../../tools/tools').ensureAuthenticated;
var board= require('../../model/board') ;
var user= require('../../model/user') ;
var column= require('../../model/colum') ;
var item= require('../../model/item') ;

var baseDIR = 'boards/';

var date = new Date();
var current_hour = date.getHours();

router.use(flash());
router.get('/',ensureauthenticated,function (req,res) {
    board.getAllBoards(function (err,boards) {
        if (err) throw err;

        if(!boards)
            boards=[] ;
        user.getAllUsers(function (err ,allusers) {



            res.render(baseDIR + 'boards', {title: 'boards', layout: 'layout', boards: boards,users:allusers});
        });
    });
});
router.get('/delete/:name',ensureauthenticated,function (req,res,next){
    board.deleteOne({board_name:req.params.name}, function (err) {                     //  to delete some testing board
        if (err) throw err;
        console.log("board "+req.params.name+" success delete ")  ;
    });
    res.location('/boards/');
    res.redirect('/boards/');
});

router.post('/add',ensureauthenticated, function (req, res, next) {
    var boardname = req.body.name;
    var descprition = req.body.description;
    var users = req.body.users;
    var image=req.body.image;
    console.log("dsgsfgsfgfsg"+image);
    if(image==null){
        image="white";
    }


    req.checkBody('name', 'Board name  is required!').notEmpty();
    req.checkBody('description', 'Description is required!').notEmpty();
    req.checkBody('users', 'Description is required!').notEmpty();



    boardname = boardname.replace(/\s/g, '_');



    var errors = req.validationErrors();
    console.log(errors);
    if (errors) {
        return res.render(baseDIR+'/boards' , {
            title: 'Add board',
            layout: 'dashboardLayout',
            errors: errors

        });
    } else {
        var newboard = new board({
            board_name:boardname,
            description:descprition,
            users:users,
            creationDate: date,
            image:image

        });

        board.createBoard(newboard, function (err, board) {
            if (err) throw err;
            console.log(board);

            req.flash('success', 'board created successfully!');
            res.location('/board/display/'+boardname);
        res.redirect('/board/display/'+boardname) ;
        });

    }

});


module.exports = router;