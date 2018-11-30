var express = require('express');
var router = express.Router();
var flash = require('connect-flash');
var ensureauthenticated = require('../../tools/tools').ensureAuthenticated;
var board= require('../../model/board') ;
var column= require('../../model/colum') ;
var item= require('../../model/item') ;


var baseDIR = 'boards/';

var date = new Date();
var current_hour = date.getHours();

router.use(flash());
 module.exports=router ;


 router.post('/addcolumn',ensureauthenticated,function (req,res) {

    var name_column = req.body.name


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



         board.boardAddColumn("fatnassi",newcolumn,function (err,columnpushed) {
            // if(err)throw  err ;
             console.log(columnpushed) ;


         }) ;
         res.location('/boards') ;
         res.redirect('/boards') ;

     }


 });


 router.get('delete/:columnname',ensureauthenticated,function (req,res) {
     board.deletecolumn("fatnassi",req.params.columnname,function (err) {
         if (err) throw err;
         console.log("column  "+req.params.columnname+" success delete ")  ;
     });
     res.location('/boards/');
     res.redirect('/boards/');

 }) ;