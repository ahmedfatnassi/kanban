var mongoose = require('mongoose') ;
var schema = mongoose.Schema ;

var db = mongoose .connection ;

var columnschema  = mongoose.Schema({

    id_: Number ,
    column_name:{
        type:String ,
        Index :true
    },




    items :[{
        type:mongoose.Schema.Types.ObjectId ,
        ref: 'item' ,
        Index :true
    }],


});
var column =module.exports=mongoose.model('column',columnschema) ;///thsi make his schemas availeble out of this file

module.exports.createColumn=function (newcolumn,callback) {
    newcolumn.save(callback);

};
module.exports.ColumnAddItem=function(columntoupdate_id,item,callback){
    column.findOne({_id:columntoupdate_id})
        .then(function (column, err) {
            column.items.push(item);
            console.log("after board " +column);

            column.save(callback);

        });

};
module.exports.getColumnById= function (_id,callback) {
    column.findById(_id,callback) ;
};

module.exports.getallcolumsofboard= function (board,i,callback) {
    column.findById(board.columns[i],callback) ;
};
module.exports.getAllColums = function (callback) {
    column.find(callback);
};

module.exports.updateColumns =function (id,ecolumn, callback) {
    if(ecolumn.id.name!=""){

    }
};