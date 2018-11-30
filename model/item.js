//import {Mixed} from "mongoose";

var mongoose = require('mongoose') ;
var schema = mongoose.Schema ;

var db = mongoose .connection ;

var itemschema  = mongoose.Schema({
    title:{
        type:String ,
        Index :true
    },
    description :{type :String} ,
    duedate:{type:Date} ,
    assigneduser:Number,
    estimatehours:{type :Number}
    ,
    attachement:{type :String} ,


    position: Number ,
    column_id :Number ,
    begin_date:Date ,

    color:String ,
    status:String ,


    comments :[{
        type:mongoose.Schema.Types.ObjectId ,
        ref: 'comment'
    }],
    creation_date :{
        type:Date
    }

});
var item =module.exports=mongoose.model('item',itemschema) ;///
module.exports.getItelmbyId=function (item_id,callback) {
    item.findById(item_id,callback) ;
};
module.exports.createItem=function (newitem, callback) {
    item.save(newitem,callback);
};
/*item.exports.deleteItemById= function (id,callback) {
    item.findOneAndDelete(id,callback) ;
};*//*
module.BoardAddColumn=function(boardtoupdate,column,callback){
    board.update({_id:boardtoupdate._id},{$push:{columns:column}},callback) ;
    board.save(done);
};*/
