var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
  


var refresh = function() {
  $http.get('/bucketlist').success(function(response) {
   
    $scope.bucketlist = response;
    $scope.wishlist = "";
  });
};

refresh();

$scope.addwishlist = function() {
  console.log($scope.wishlist);
  $http.post('/bucketlist', $scope.wishlist).success(function(response) {
    console.log(response);
    refresh();
  });
};

$scope.remove = function(id) {
  console.log(id);
  $http.delete('/bucketlist/' + id).success(function(response) {
    refresh();
  });
};

$scope.edit = function(id) {
  console.log(id);
  $http.get('/bucketlist/' + id).success(function(response) {
    $scope.wishlist = response;
  });
};

$scope.update = function() {
  console.log($scope.wishlist._id);
  $http.put('/bucketlist/' + $scope.wishlist._id, $scope.wishlist).success(function(response) {
    refresh();
  })
};


}]);﻿



