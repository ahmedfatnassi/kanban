var express = require('express');
var router = express.Router();
var flash = require('connect-flash');
var ensureauthenticated = require('../../tools/tools').ensureAuthenticated;
var board= require('../../model/board') ;
var column= require('../../model/colum') ;
var user= require('../../model/user') ;
var item= require('../../model/item') ;


var baseDIR = 'boards/';

var date = new Date();
var current_hour = date.getHours();

router.use(flash());
 module.exports=router ;


 router.post('/addcolumn/:boardname',ensureauthenticated,function (req,res) {

    var name_column = req.body.name ;


     req.checkBody('name','name is require').notEmpty() ;
    //board.getByBoardName(name_board,function (err,currentboard) {
       // if(err) throw err ;
       /* if(currentboard.columns) {currentboard.columns=[] ;
        var max= -1;
        for(var i=0;i<currentboard.columns.length;i++){
             if(max<currentboard.columns[i].position) currentboard.columns[i].position=max;
        }
        position=max ;
        }*/
    //});
     var errors = req.validationErrors();
     console.log(errors);
     if (errors) {

     }else {
      var newcolumn=  new column({
          column_name: name_column
      }) ;

      column.createColumn(newcolumn,function (err ,column) {
          if(err)throw  err ;
            console.log(column) ;
      }) ;

        var boardname=req.params.boardname ;
        console.log(boardname);
         board.boardAddColumn(boardname,newcolumn,function (err,columnpushed) {
            if(err)throw  err ;
             console.log(columnpushed) ;


         }) ;
         res.location('/board/display/'+boardname) ;
         res.redirect('/board/display/'+boardname) ;

     }


 });
router.post('/additem/:boardname',ensureauthenticated,function (req,res) {
   var boardname = req.params.boardname ;
    var title = req.body.title ;
    var description = req.body.description ;
    var user = req.body.user ;
    var columnitem = req.body.column ;
// it remains hour estimate


    req.checkBody('title','title is require').notEmpty() ;
    req.checkBody('description','description is require').notEmpty() ;
    req.checkBody('user','user is require').notEmpty() ;
    req.checkBody('column','columnitem is require').notEmpty() ;

    var errors = req.validationErrors();
    console.log(errors);
    if (errors) {

    }else {     /// i here right now  it remains just creation of item and add it to the column
        var newitem=  new item({
            title:title,
            description :description ,
            assigneduser:user,
        }) ;
       /* item.createItem(newitem,function(err,itemcreate ){
            if(err)throw  err ;
            console.log("item"+itemcreate);
        });*/
        column.ColumnAddItem(columnitem,newitem,function (err ,column) {
            if(err)throw  err ;
            console.log(column) ;
        }) ;


        res.location('/board/display/'+boardname) ;
        res.redirect('/board/display/'+boardname) ;

    }


});

router.get('/display/:name',ensureauthenticated,function (req,res) {
    //var columns =[];
    var items=[] ;
    board.getallcolumns(req.params.name,function (err,board){
        if (err) throw err ;

    user.getAllUsers(function (err,users) {
        res.render(baseDIR+'board',{title:'board/:name',layout:'layout',board:board,columns:board.columns,users:users});
    });
    }) ;
});
 router.get('/delete/:board_name/:columnid',ensureauthenticated,function (req,res) {
     var board_name =req.params.board_name ;
     console.log(board_name) ;
     board.deletecolumn(board_name,req.params.columnid,function (err,board) {
         if (err) throw err;
         console.log("after delet column "+board) ;
     });

     item.getAllitems(function (err,items) {
        if(items!=null){
            console.log(items) ;
        }
     });
     res.location('/board/display/'+board_name);
     res.redirect('/board/display/'+board_name);

 }) ;