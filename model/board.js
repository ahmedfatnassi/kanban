
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
    users:[{type:String}] ,
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
var board =module.exports=mongoose.model('board',boardschema) ;///this make his schemas availeble out of this file

module.exports.createBoard=function (newBoard,callback) {
        newBoard.save(callback);
};
module.exports.boardAddColumn=function(boardname,column,callback) {

    board.findOne({board_name: boardname})
        .then(function (board, err) {

        board.columns.push(column);
            console.log("after board " + board);

            board.save(callback);

    });

};

module.exports.deletecolumn =function(boardname,column_id,callback){
    board.findOne({board_name:boardname})
        .then((newboard)=>{newboard.columns.pull({_id:column_id}) ;
        newboard.save(callback);
        }) ;


} ;

module.exports.getallcolumns=function(boardname,callback){
    board.findOne({board_name:boardname})
        .populate({path :'columns'
        , populate :{path:'items'}})
        .exec(callback)



};

/*module.exports.delete=function(board_name,column_id,callback){
    board.({name:board_name},{c:{columns:column}},callback)
*/
module.exports.getByBoardName= function (board_name,callback) {
    var query = {board_name:board_name};
    board.findOne(query,callback) ;
};

module.exports.getAllBoards = function (callback) {
    board.find({})
        .populate({path :'columns'
            , populate :{path:'items'}})
        .exec(callback) ;
};
module.exports.updateBoard =function (id,board, callback) {
    if(board.name!=""){

    }
}