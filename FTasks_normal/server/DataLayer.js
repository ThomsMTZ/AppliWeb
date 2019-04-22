// Require
var mongoose = require('mongoose');
var uuidv4 = require('uuid/v4');
var dateFormat = require('dateformat');

//Connection
mongoose.connect('mongodb+srv://Thomas:MrGOW2608@applicationweb-6ipgu.gcp.mongodb.net/test?retryWrites=true', function( error ){
    if( error ) {
        throw error; 
    } else {
        console.log('Connection with mongo initialized');
        console.log('http://localhost:8090');
    }
});

// Task schema for mongoose
var taskSchema = mongoose.Schema({
    _id: String,
    author : String,
    title : String,
    task : String,
    done : Boolean,
    date: String
}, {
    versionKey: false
});


// User schema for mongoose
var userSchema = mongoose.Schema({
    _id: String,
    username : String,
    password : String
}, {
    versionKey: false
});

// Task model
var taskModel = mongoose.model( 'taskModel', taskSchema );

// User model
var userModel = mongoose.model( 'userModel', userSchema );

var DataLayer = {

    getTaskModel: function(cb){
        return taskModel;
    },

    getPasswordOfLogin: function( username, cb ){

        userModel.findOne( {username : username}, function ( error, user ) {
            if( error ){
                throw error;
            }else{
                if( user == undefined ){
                    cb( false );
                }else{
                    cb( user.password );
                }
            }
        });  
    },

    loginExist: function( username, cb ){

        userModel.findOne( {username : username}, function ( error, user ) {
            if( error ){
                throw error;
            }else{
                if( user == undefined ){
                    cb(true);
                }else{
                    cb(false);
                }
            }
        });  
    },

    register: function( username, password, cb ){   

        var userToSave = new userModel();
        userToSave._id = uuidv4();
        userToSave.username = username;
        userToSave.password = password;

        userToSave.save(function( error ){
            if( error ){
                throw error;
            }
        });
    },

    getAllTasksFromAuthor: function( author, cb ){

        taskModel.find( {author: author}, function ( error, tasks ) {
            if( error ){
                throw error;
            }else{
                cb( tasks );
            }
        });        
    },

    addTask: function( dataTask, cb ){

        var taskToSave = new taskModel();
        taskToSave._id = uuidv4();
        taskToSave.author = dataTask.author;
        taskToSave.title = dataTask.title;
        taskToSave.task = dataTask.task;
        taskToSave.done = false;
        taskToSave.date = dateFormat( new Date(), "yyyy-mm-dd'T'HH:MM:ss");

        taskToSave.save(function( error ){
            if( error ){
                throw error;
            }else{
                cb();
            }
        });
    },

    removeTask: function( _id, cb ){
        
        taskModel.findByIdAndRemove(_id, function(err, todo){
            if (err){
                throw err;
            }else{
                cb();
            }
        });
    },

    setStatusTask: function( _id, done, cb ){

        taskModel.findByIdAndUpdate( _id , {done : done}, function(err, todo){
            if(err){
                throw err;
            }else{
                cb();
            }

        });
    }
}

module.exports = DataLayer;