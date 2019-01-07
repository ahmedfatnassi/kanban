
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
// create Board
module.exports.createBoard=function (newBoard,callback) {
        newBoard.save(callback);
};
// add column to the board
module.exports.boardAddColumn=function(boardname,column,callback) {

    board.findOne({board_name: boardname})
        .then(function (board, err) {

        board.columns.push(column);
            console.log("after board " + board);

            board.save(callback);

    });

};
 //delete column which belong to board has boardname
module.exports.deletecolumn =function(boardname,column_id,callback){
    board.findOne({board_name:boardname})
        .then((newboard)=>{newboard.columns.pull({_id:column_id}) ;
        newboard.save(callback);
        }) ;


} ;
module.exports.deleteItem =function(boardname,column_id,item_id,callback){
    board.findOne({"board_name":boardname,"columns_id":column_id,"columns.items._id":item_id})
        .then((newboard)=>{newboard.columns.items.pull({_id:column_id}) ;
            newboard.save(callback);
        }) ;


} ;

module.exports.changeItemPosition=function(boardname,oldColumId,itemId,newColumnID,prevItemId,nextItemId,callback){
    var i_item ;
    var j_item ;
    var itemfound =false ;
    var newcolumnId=-1;
    var j_prev_pos =-1 ;
    var i_prev_pos =-1 ;
    var i_next_pos =-1 ;
    var j_next_pos =-1 ;
    board.findOne({board_name:boardname})
        .populate({
            path :'columns'
            , populate :[
                {path:'items'}
            ]})
        .then((boardTochange)=>{
            console.log("fchrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr"+boardTochange);
            for (var i = 0; i < boardTochange.columns.length; i++) {

                console.log("Iam here ");
                if (newColumnID == boardTochange.columns[i]._id){
                    newcolumnId=i;
                }
                for (var j = 0; j < boardTochange.columns[i].items.length; j++) {
                    console.log("iam there "+itemId+"   "+boardTochange.columns[i].items[j]._id);

                        if (itemId == boardTochange.columns[i].items[j]._id) {
                            /// remove item from column
                            i_item = i;
                            j_item = j;
                            itemfound = true;
                            console.log(i_item+ +j_item);
                            console.log("itemmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm tranported " + boardTochange.columns[i_item].items[j_item]);

                        }

                    if (prevItemId != "undefined" && prevItemId === boardTochange.columns[i].items[j]._id) {
                        i_prev_pos = i;
                        j_prev_pos = j;
                    } else {
                        if (nextItemId != "undefined" && nextItemId === boardTochange.columns[i].items[j]._id) {
                            i_next_pos = i;
                            j_next_pos = j;
                        }
                    }
                }
            }
            console.log("vide vide vide " +prevItemId+" "+nextItemId+" "+newcolumnId);


                    boardTochange.columns[newcolumnId].items.push(boardTochange.columns[i_item].items[j_item]) ;
     //               boardTochange.columns[i_item].items.pull({_id:itemId});
                    console.log(boardTochange);

            //var itemfoundposition = false;
          /*  for (var i = 0; i < boardTochange.columns.length; i++) {
                if (newColumnID == boardTochange.columns[i]._id) {
                    for (var j = 0; j < boardTochange.columns[i].items.length; j++) {
                        if (prevItemId != "undefined" && prevItemId === boardTochange.columns[i].items[j]._id) {

                            /*     board.columns.update(
                                     {board_name: boardname },

                                     {
                                         $push: {
                                             items: {
                                                 $each: [ item],
                                                 $position:j+1
                                             }
                                         }
                                     }
                                 )
         */
                    /*    } else {
                            if (nextItemId != "undefined" && nextItemId === boardTochange.columns[i].items[j]._id) {

                                /*board.columns.update(
                                    {board_name: boardname },

                                    {
                                        $push: {
                                            items: {
                                                $each: [ item],
                                                $position:j-1
                                            }
                                        }
                                    }
                                )
      */

                       /*     } else {
                               // boardTochange.columns[i].items.push(boardTochange.columns[i_item].items[j_item]);
                            }
                        }

                        if (itemfoundposition) {
                            boardTochange.columns[i].items[j].position = boardTochange.columns[i].items[j].position + 1;
                        }


                    }
                }
            }*/
                       console.log("yeahhhhhh") ;
                       boardTochange.save(callback);
        });






};
//
module.exports.getallcolumns=function(boardname,callback){
    board.findOne({board_name:boardname})
        .populate({
            path :'columns'
        , populate :[
            {path:'items'}
            ]})
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
// get all boards that i can access
module.exports.getMyBoards= function(username,callback){
  board.find({users:username})
      .populate({path :'columns'
          , populate :{path:'items'}})
      .exec(callback) ;
};


