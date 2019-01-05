var mongoose = require('mongoose') ;
var schema = mongoose.Schema ;

var bcrypt = require('bcrypt');

// user schema
mongoose.connect('mongodb://localhost/nodeauth', function (err) {

    if (err) throw err;

    console.log('Successfully connected');

});
var db = mongoose .connection ;


var Userschema = mongoose.Schema({

    username:{
        type:String
        , Index :true
    },
    password:{
        type :String ,bcrypt: true ,required: true,

    },
    email:{
        type:String

    }
    ,
    admin :{
        type:Boolean
    }

});

var User =module.exports=mongoose.model('User',Userschema) ;///thsi make his schemas availeble out of this file


module.exports.getUserByUsername = function (username, callback) {
    var query = {username: username};
    User.findOne(query, callback);
};
module.exports.createUser=function (newUser,callback) {
    bcrypt.hash(newUser.password, 10, function (err, hash) {
        if (err) throw err;
        newUser.password = hash;
        newUser.save(callback);
    });
};
module.exports.deleteUserById = function(usersId,callback){
  User.findOneAndDelete({_id:usersId},function(err ,user){
      console.log("user was delete with success "+user) ;

  })
};
module.exports.comparePassword = function (condPassword, hash, callback) {
    bcrypt.compare(condPassword, hash, function (err, isMatch) {
        if (err) callback(err);
        callback(null, isMatch);
    })
};

module.exports.getAllUsers = function (callback) {
    User.find(callback);

};



module.exports.getUserById = function (id, callback) {
    User.findById(id, callback);
};



module.exports.updateUserPassword = function (id, newUser, callback) {
    if (newUser.password !== '') {
        bcrypt.hash(newUser.password, 10, function (err, hash) {
            if (err) throw err;
            newUser.password = hash;
            User.findByIdAndUpdate(id, newUser, callback);
        });
    } else {
        callback(null);
    }
};
module.exports.deleteUser = function(id,callback){
    User.findOneAndDelete({id:id}).exec();

} ;

