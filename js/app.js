var app = angular.module("FTasks", ["ngRoute"]);

//* ------- ROUTING -------
app.config( function($routeProvider) {
  $routeProvider
      .when("/", {templateUrl : "home.html", controller: "tasksController"})
      .when("/Login", {templateUrl : "login.html",  controller: "loginController"})
      .when("/Register", {templateUrl : "register.html",  controller: "registerController"})
      .otherwise({redirectTo : "/"});
});