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
    assigneduser:String,
    estimatehours:{type :Number}
    ,
    attachement:{type :String} ,


    position: Number ,
    begin_date:Date ,

    color:String ,
    status:String ,


    comments :[{
        type:schema.Types.ObjectId ,
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
module.exports.getAllitems=function(callback){
  item.find(callback);
};
module.exports.createItem=function (newitem, callback) {
    newitem.save(callback);
};
module.exports.deleteItemById= function (callback) {
    item.deleteMany({},callback);
};/*
module.BoardAddColumn=function(boardtoupdate,column,callback){
    board.update({_id:boardtoupdate._id},{$push:{columns:column}},callback) ;
    board.save(done);
};*/
