var express = require('express');
var router = express.Router();
var flash = require('connect-flash');
var ensureauthenticated = require('../../tools/tools').ensureAuthenticated;
var board= require('../../model/board') ;
var user= require('../../model/user') ;
var column= require('../../model/colum') ;

var baseDIR = 'admin/';



///router.use(flash());


router.get('/delete/:name',ensureauthenticated, function (req, res, next) {
    board.getByBoardName(req.params.board_name, function (err, board) {
        if (err) throw err;
        if (!board) {
            return res.redirect('/settings');
        }
        board.remove({_id: board._id}, function (err) {
            if (err) throw err;
            req.flash('success', 'Category deleted successfully');
            return res.redirect('/settings');
        })
    });
});

router.post('/edit/board/:id',ensureauthenticated,function (req, res, next) {
    var boardf=[] ;
    board.getByBoardName(req.params.id,function(err,boarddb){
        if (err) throw err;
        if (!boarddb) {
            boarddb=[];
            boardf=boarddb;
        }

    });
        var boardname = req.body.board_name;
        var descprition = req.body.description;
        var admin = req.body.admin;
        var users= req.body.users ;
        var colums= req.body.colums ;

        req.checkBody('board name', 'Board name  is required!').notEmpty();
        req.checkBody('description', 'Description is required!').notEmpty();
        req.checkBody('Admin', 'Admin is required').notEmpty();
        req.checkBody('users', 'it\'s require at least one user').notEmpty();
        req.checkBody('colums','it\'s require at least one colum').notEmpty() ;



        var errors = req.validationErrors();

        if (errors) {
            return res.render(baseDIR + 'addUser', {
                title: 'Add User',
                layout: 'dashboardLayout',
                errors: errors

            });
        } else {
            var boarddb = new baseDIR({
                board_name:boardname,
                description:descprition,
                users:users ,
                defaultadmin:admin,
                columns :colums,
                creationDate: current_hour,

                image: {
                    type: String
                }
            });

            board.updateBoard(boarddb._id,boarddb,function (err){
                if (err) throw err;
                req.flash('success', 'Category updated successfully');
                return res.redirect('/admin/category');
            });


        }

});

router.get('/',ensureauthenticated, function (req, res) {
    var boards=[] ;
    var users=[] ;
    var columns=[] ;
    board.getAllBoards(function (err, boardsDB) {
        if (err) throw err;
        if (!boardsDB) {
            boardsDB=[];
            boards=boardsDB ;
        }


    user.getAllUsers(function (err, usersDB) {
        if (err) throw err;
        if (!usersDB) {
            usersDB=[];
            users=usersDB ;
        }

   /* column.getAllColums(function (err, columnDB) {
        if (err) throw err;
        if (!columnDB) {
            columnDB=[];
            columns=columnDB;
        }*/

    res.render(baseDIR+'setting',{title:"setting",layout:'layout',boards:boardsDB,users:usersDB,columns:columns})
    });
    //});
});
});
module.exports = router;