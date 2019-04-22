//* ------- factoryICE -------

app.factory('tasksFactory', function($http) {

  var factory = {};

  factory.getAllTasksFromAuthor = function ( author, cb ) {

    var requete = {
      author : author
    };
 
    $http.post('/getAllTasksFromAuthor', requete )
    .then(function ( response ) {
      cb(response.data.tasks)
    })
    .catch( function( response ){
      cb("Impossible d'obtenir les taches de \'" + author + "\'");
      cb( response );
    });
  };

  factory.addTask = function( title, task, author ){
    var requete = {
      title : title,
      task : task,
      author : author
    };
 
    $http.post('/addTask', requete )
    .catch( function( response ){
      console.log("Impossible d'ajouter la tache de \'" + author + "\' intitulé \'" + title + "\' disant \'" + task + "\'");
      cb( response );
    });
  };
  
  factory.removeTask = function( _id ){
    var requete = {
      _id : _id
    };
 
    $http.post('/removeTask', requete )
    .catch( function( response ){
      console.log("Impossible de supprimer la tache d'id \'" + _id + "\'");
      cb( response );
    });
  };

  factory.setStatusTask = function( _id, done ){
    var requete = {
      _id : _id,
      done : done
    };

    $http.post('/setStatusTask', requete )
    .catch( function( response ){
      console.log("Impossible de changer le statut de la tache d'id \'" + _id + "\'");
      cb( response );
    });
  };

  return factory;

});

app.factory('loginFactory', function($http) {

  var factory = {};

  factory.getPasswordOfLogin = function ( username, password, cb ) {

    var requete = {
      username : username,
      password : password
    };
 
    $http.post('/getPasswordOfLogin', requete )
    .then(function ( response ) {
      cb(response.data)
    })
    .catch( function( response ){
      console.log("Impossible de logger l'username \'" + username + "\'");
      cb( response );
    });
  };

  return factory;

});

app.factory('registerFactory', function($http) {

  var factory = {};

  factory.register = function ( username, password, cb ) {

    var requete = {
      username : username,
      password : password
    };
 
    $http.post('/register', requete )
    .then(function ( response ) {
      cb(response.data.available)
    })
    .catch( function( response ){
      console.log("Impossible d'enregistrer l'username \'" + username + "\'");
      cb(response.data.available)
    });
  };

  return factory;

});