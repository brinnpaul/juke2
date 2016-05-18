'use strict';

juke.controller('AlbumsCtrl', function ($scope, $rootScope, $log, StatsFactory, AlbumFactory) {

  AlbumFactory.fetchAll()
  .then(function(albums) {
    $scope.albums = albums

    $scope.albumIds = albums.map(function(album) {
      return album.id
    })
    console.log($scope.albumIds)
  })

  // $scope.albumIds = $scope.albums.map(function(album) {
    // return album.id
  // })

  // console.log($scope.albumIds)

})
