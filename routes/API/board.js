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
         req.flash('success', 'board column added successfully!');

         res.location('/board/display/'+boardname) ;
         res.redirect('/board/display/'+boardname) ;

     }


 });
router.post('/updateitem/:boardname',ensureauthenticated,function (req,res) {
    var boardname = req.params.boardname ;
    var itemid =req.body.itemid ;
    var oldcolumn=req.body.oldcolumnid ;
    var newcolumn = req.body.newcolumnid ;
    var nextItemlId = req.body.nextitem ;
    var prevItemId = req.body.previtem ;
console.log( boardname +" "+itemid+" "+oldcolumn+" "+newcolumn+" "+nextItemlId+" "+prevItemId);
    var i_item ;
    var j_item ;
    var itemfound =false ;
    var newcolumnId=-1;
    var j_prev_pos =-1 ;
    var i_prev_pos =-1 ;
    var i_next_pos =-1 ;
    var j_next_pos =-1 ;
    board.getallcolumns(boardname,function(err ,boardTochange){
        if(err) throw err ;

        for (var i = 0; i < boardTochange.columns.length; i++) {



            for (var j = 0; j < boardTochange.columns[i].items.length; j++) {


                if (itemid == boardTochange.columns[i].items[j]._id) {
                    /// remove item from column
                    i_item = i;
                    j_item = j;
                    itemfound = true;
                }

                if (prevItemId !== "undefined" && prevItemId == boardTochange.columns[i].items[j]._id) {
                    i_prev_pos = i;
                    j_prev_pos = j;
                }else {
                    if (nextItemlId !== "undefined" && nextItemlId == boardTochange.columns[i].items[j]._id) {
                        i_next_pos = i;
                        j_next_pos = j;
                    }
                }
            }
        }
///creation de sudocument


        var itemtransported=item(boardTochange.columns[i_item].items[j_item]);
        column.deleteitem(oldcolumn,itemid,function (err) {
            if(err) throw err ;
        });
        item.createItem(itemtransported,function(err,itemcreate ) {
            if (err) throw  err;
            //console.log("item" + itemcreate);

            if(j_prev_pos===-1 &&j_next_pos===-1 ){

                column.ColumnAddItem(newcolumn, itemcreate, function (err, column) {
                    if (err) throw  err;
                    console.log(column);
                });
            }else{
                if(j_prev_pos===-1){
                    column.ColumnAddItematposition(newcolumn, itemcreate,0, function (err, column) {
                        if (err) throw  err;
                        console.log(column);
                    });
                }else{
                    column.ColumnAddItematposition(newcolumn, itemcreate,j_prev_pos+1, function (err, column) {
                        if (err) throw  err;
                        console.log(column);
                    });
                }
            }
        });

    });


});

router.post('/additem/:boardname',ensureauthenticated,function (req,res) {
   var boardname = req.params.boardname ;
    var title = req.body.title ;
    var description = req.body.description ;
    var user = req.body.user ;
    var columnid = req.body.columnid ;
    var color =req.body.color ;
    // somehow i get ""idcolumn"" so i decide to just  delete quotes
    columnid=columnid.replace('"','');
    columnid=columnid.replace('"','');
    columnid=columnid.replace('"','');
    columnid=columnid.replace('"','');

    columnid=columnid.toString();
    req.checkBody('title','title is require').notEmpty() ;
    req.checkBody('description','description is require').notEmpty() ;
    req.checkBody('user','user is require').notEmpty() ;
   //req.checkBody('columnid','column is require').notEmpty() ;
    if(color==null){
        color =	"#ffffff";
    }
    var errors = req.validationErrors();
    console.log(errors);
    if (errors) {

    }else {     /// i here right now  it remains just creation of item and add it to the column
        var newitem=  new item({
            title:title,
            description :description ,
            assigneduser:user,
            color:color
        }) ;
        item.createItem(newitem,function(err,itemcreate ) {
            if (err) throw  err;
            console.log("item" + itemcreate);

            column.ColumnAddItem(columnid, itemcreate, function (err, column) {
                if (err) throw  err;
                console.log(column);
            });
        });
        req.flash('success', 'item created successfully!');

        res.location('/board/display/'+boardname) ;
        res.redirect('/board/display/'+boardname) ;

    }


});

router.get('/display/:name',ensureauthenticated,function (req,res) {
    //var columns =[];
    var items=[] ;
    board.getallcolumns(req.params.name,function (err,board){
        if (err) throw err ;
        console.log(board) ;
        console.log(board.columns[0].items[0]) ;
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
         console.log("after delete column "+board) ;
     });

     item.getAllitems(function (err,items) {
        if(items!=null){
            console.log(items) ;
        }
     });
     res.location('/board/display/'+board_name);
     res.redirect('/board/display/'+board_name);

 }) ;