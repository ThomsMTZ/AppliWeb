app.controller("tasksController", function($scope, tasksFactory, $rootScope, $location ) {
 
    $scope.getAllTasksFromAuthor = function(){
       
        if( $rootScope.loggedUser == undefined && sessionStorage.getItem("loggedUser") == undefined ){  
            $location.path("/Login");
        }else{
            
            $rootScope.loggedUser = sessionStorage.getItem("loggedUser");
        }
        
        tasksFactory.getAllTasksFromAuthor( $rootScope.loggedUser, function( tasks ) {
            $scope.tasks = tasks;
        });
    }

    $scope.addTask = function(){
        tasksFactory.addTask( $scope.newTask.title, $scope.newTask.task, $rootScope.loggedUser )
        $scope.newTask.title = '';
        $scope.newTask.task = '';

        $scope.getAllTasksFromAuthor( $rootScope.loggedUser );
    }

    $scope.removeTask = function( task ){
        tasksFactory.removeTask( task._id );

        $scope.getAllTasksFromAuthor( task.author );
    }

    $scope.setStatusTask = function( task ){
        tasksFactory.setStatusTask( task._id, !task.done );

        $scope.getAllTasksFromAuthor( task.author );
    }
});

app.controller("registerController", function($scope, registerFactory, $location, $rootScope) {

    $scope.register = function(){
        $scope.error = '';

        if( $scope.register.password == $scope.register.passwordVerification ){
            registerFactory.register( $scope.register.username, $scope.register.password , function( available ) {
                if( !available ){
                    $scope.error = "Username not available";
                }else{
                    
                    sessionStorage.setItem("loggedUser",$scope.register.username);
        
                    $location.path( "/" );
                }
            });
        }else{
            $scope.error = "Your passwords do not match"
        }
        $scope.register.password = '';
        $scope.register.passwordVerification = '';
    }
});

app.controller("loginController", function($scope, loginFactory, $location, $rootScope ) {

    $scope.login = function(){
        $scope.error = '';

        loginFactory.getPasswordOfLogin( $scope.login.username, $scope.login.password , function( passwords ) {
            if( passwords.password != passwords.passwordToTest ){
                $scope.error = "Invalid username or password";
            }else{
                
                sessionStorage.setItem("loggedUser",$scope.login.username);
        
                $location.path( "/" );
            }
        });
        $scope.login.password = '';
    }

    $scope.logout = function(){
        sessionStorage.removeItem("loggedUser");
        $rootScope.loggedUser = undefined;
        $location.path("/Login");
    }
});