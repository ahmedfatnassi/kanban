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
    /*
    var  newitem=new item({
        title:"back_end",
        description :"base de donnée et les routes",
        assigneduser_id:0,
        estimatehours:2
        ,
        position: 0,
        column_id :4,
        begin_date:date ,
        status:"hard" ,
        comments :[],
        creation_date :date
    }) ;

    var  newitem1=new item({
        title:"front_end",
        description :"settings page",
        assigneduser_id:0,
        estimatehours:4
        ,
        position: 0,
        column_id :5,
        begin_date:date ,
        status:"hard" ,
        comments :[],
        creation_date :date
    }) ;

    var  newitem2=new item({
        title:"base_de_donnée",
        description :"base de donnée moogo",
        assigneduser_id:0,
        estimatehours:2
        ,
        position: 0,
        column_id :6,
        begin_date:date ,
        status:"hard" ,
        comments :[],
        creation_date :date
    }) ;

     var newcolumn=new column({
        _id:4  ,
         column_name:"To DO",
        position:1 ,
        board_id : 4,
        items :[newitem],
    });

    var newcolumn1=new column({
        _ind:5,
        column_name:"in process",
        position:2 ,
        board_id : 4,
        items :[newitem1],
    });
    var newcolumn2=new column({
        _id:6 ,
        column_name:"done",
        position:3 ,
        board_id : 4,
        items :[newitem2],
    });

   var newboard = new board({
        _id:4 ,

        board_name:"version_3",
        description:"robot  artificille intellegent" ,
        users_ids :[2],

        columns :[newcolumn,newcolumn1,newcolumn2],
        creationDate: date,



});
    board.createBoard(newboard,function (err,nboard) {
        if (err) throw err;
        console.log(" nboard creat with success"+nboard) ;
    });
    board.boardAddColumn(4,newcolumn,function (err,column) {
        if (err) throw err;
    });
    board.boardAddColumn(4,newcolumn1,function (err,column) {
        if (err) throw err;
    });
    board.boardAddColumn(4,newcolumn2,function (err,column) {
        if (err) throw err;
    });
    column.ColumnAddItem(newcolumn1,fucn)*/
   /**/
    board.getAllBoards(function (err,boards) {
        if (err) throw err;

        if(!boards)
            boards=[] ;
        user.getAllUsers(function (err ,allusers) {


            //console.log(boards);
            console.log(boards);
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
    //var defaultadmin_id =req.body.description ;

  console.log("all users"+users);

    req.checkBody('name', 'Board name  is required!').notEmpty();
    req.checkBody('description', 'Description is required!').notEmpty();




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
            creationDate: date ,
        });

        board.createBoard(newboard, function (err, board) {
            if (err) throw err;
            console.log(board);


        res.location('/boards/display/'+boardname);
        res.redirect('/boards/display/'+boardname) ;
        });
    }

});


module.exports = router;