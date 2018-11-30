
var mongoose = require('mongoose')
const columnshema = require('./colum');
var schema = mongoose.Schema ;

var db = mongoose .connection ;
mongoose.set('useFindAndModify', false);

var boardschema = mongoose.Schema({


    board_name:{
        type:String ,
        Index :true
    },
    description:{
        type :String

    },
    users_ids:[{type:Number}] ,
    defaultadmin:{
        type:schema.Types.ObjectId ,
        ref :'user'
    },
    columns :[{
        type:schema.Types.ObjectId ,
        ref :'column'
    }],
    creationDate: {
        type: Date
    },

    image: {
        type: String
}
});
var board =module.exports=mongoose.model('board',boardschema) ;///thsi make his schemas availeble out of this file

module.exports.createBoard=function (newBoard,callback) {
        newBoard.save(callback);
};
module.exports.boardAddColumn=function(boardname,column,callback){

        board.findOne({board_name:boardname})
        .then((newboard)=>{newboard.columns.push(column)
            console.log("board "+newboard);
            newboard.save(callback);
        }) ;

};
module.exports.deletecolumn =function(boardname,columnname,callback){
    board.findOne({board_name:boardname})
        .then((newboard)=>{newboard.columns.remove({column_name:columnname})
            newboard.save(callback);
        }) ;


} ;

module.exports.getallcolumns=function(boardname,callback){
    board.findOne({board_name:boardname})
        .populate({path :'columns',model :'column'})
        .then((newboard)=>{
            console.log("lksgnmlsnmmosjg    i'am here \n "+newboard.columns[0]);
            newboard.save(callback);

        }) ;

};

/*module.exports.delete=function(board_name,column_id,callback){
    board.({name:board_name},{c:{columns:column}},callback)
*/
module.exports.getByBoardName= function (board_name,callback) {
    var query = {board_name:board_name};
    board.findOne(query,callback) ;
};

module.exports.getAllBoards = function (callback) {
    board.find(callback);
};
module.exports.updateBoard =function (id,board, callback) {
    if(board.name!=""){

    }
}