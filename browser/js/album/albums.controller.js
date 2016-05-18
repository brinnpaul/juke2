'use strict';

juke.controller('AlbumsCtrl', function ($scope, $rootScope, $log, StatsFactory, AlbumFactory) {

  AlbumFactory.fetchAll()
  .then(function(albums) {
    $scope.albums = albums ;
    console.log($scope.albums);
  })






})
