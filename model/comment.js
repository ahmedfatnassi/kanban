import {Mixed} from "mongoose";
var schema = mongoose.Schema ;

var mongoose = require('mongoose') ;
var commentshemas = mongoose.Schema({
    _id: Number ,
    content: {
        type :String
    },
    item :{
        type :schema.Types.objectId,
        ref:'' ,
        Index :true
    },
    user:{
        type :schema.Types.objectId ,
        ref :'user'
    },
    attachement:{
        type :Mixed
    },
    creation_date :{
        type:Date
    }



});
var Comment =module.exports=mongoose.model('comment',commentshemas) ;