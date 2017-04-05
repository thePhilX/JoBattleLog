var myApp = angular.module('myApp', []);

myApp.controller('AppCtrl', function($scope, $http) {
  console.log("controller working");
  $scope.filmedit = false;

  var refresh = function(){
  $http({
    method: 'GET',
    url: '/filmlist'
  }).then(function successCallback(response){
        console.log("got requested data");
        $scope.filmlist = response.data;
        // $scope.film = "";
      },function errorCallback(response){
        console.log("request failed");
   });
  };

  refresh();

  $scope.addFilm = function(){
    $http.post('/filmlist', $scope.film)
    .then(function successCallback(response){
        refresh();
        $scope.deselect();
        $scope.filmedit = false;
        console.log("post successfull");
    },function errorCallback(response){
        console.log("post failed");
    });
  };

  $scope.remove = function(id){
    $http.delete('/filmlist/' + id)
    .then(function successCallback(response){
        console.log("deleted" + id);
        refresh();
    },function errorCallback(response){
        console.log("delete " + id + " failed");
    });
  };

  $scope.edit = function(id){
    console.log("edit"+ id);
    $scope.filmedit = true;
    $http.get('/filmlist/' + id)
    .then(function successCallback(response){
        $scope.film = response.data;
        console.log("edited" + id);
    },function errorCallback(response){
        console.log("edit of " + id + " failed");
    });
  };

  $scope.update = function(id){
    console.log("update"+ $scope.film._id);
    $http.put('/filmlist/' + $scope.film._id, $scope.film)
    .then(function successCallback(response){
        console.log("update success");
        refresh();$scope.deselect();
    },function errorCallback(response){
        console.log("update failed");
    });
  };

  $scope.deselect = function() {
    $scope.film = "";
    $scope.filmedit = false;
  };

});
