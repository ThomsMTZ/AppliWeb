PORT = process.env.PORT || 5000;
var configDirectory = 'server';

var path = require('path');
var express = require('express');
var uuidv4 = require('uuid/v4');
var bodyParser = require('body-parser');
var mongo = require('./DataLayer.js');
var sha256 = require('js-sha256');

var app = express();

//init parser with express
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {extended: true}));

//authorize access to public directory to server html, css, js
app.use(express.static(path.join(__dirname.substring(0,__dirname.length-configDirectory.length), '')));

//---------- Mongo PART ----------

var taskSet = mongo.getTaskModel();

app.post('/getPasswordOfLogin', function( requete, response ) {

    mongo.getPasswordOfLogin( requete.body.username, function( password ){
    
        var data = {
            passwordToTest : sha256(requete.body.password),
            password : password
        };

        response.send(data);
    });
});

app.post('/register', function( requete, response ) {

    mongo.loginExist(requete.body.username, function( available ){

        if( available ){
            mongo.register( requete.body.username, sha256(requete.body.password));
        }
       
        var data = {
            available : available
        };

        response.send(data);
    })
});

app.post('/getAllTasksFromAuthor', function( requete, response ) {

    mongo.getAllTasksFromAuthor( requete.body.author, function( allTasks ){
    
        var data = {
            tasks : allTasks
        };

        response.send(data);
    });
});

app.post('/addTask', function( requete, response ) {

    var dataTask = {
        author : requete.body.author,
        title : requete.body.title,
        task : requete.body.task
    };

    mongo.addTask( dataTask, function( success ){
        response.send(success);
    });
    response.redirect('/');
});

app.post('/removeTask', function( requete, response ) {

    mongo.removeTask( requete.body._id, function( success ){
        response.send(success);
    });
    response.redirect('/');
});

app.post('/setStatusTask', function( requete, response ) {

    mongo.setStatusTask( requete.body._id, requete.body.done, function( success ){
        response.send(success);
    });
    response.redirect('/');
});


app.listen(PORT,"0.0.0.0", function(){
    console.log('Serveur running on port ' + PORT );
 });
