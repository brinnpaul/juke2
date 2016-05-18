'use strict';

juke.controller('AlbumCtrl', function ($scope, $rootScope, $log, StatsFactory, AlbumFactory, PlayerFactory) {

  $scope.songList = [];

  AlbumFactory.fetchById(1)
  .then(function(data) {
    return data
  })
  .then(function (album) {
    album.imageUrl = '/api/albums/' + album.id + '/image';
    album.songs.forEach(function (song, i) {
      song.audioUrl = '/api/songs/' + song.id + '/audio';
      $scope.songList.push(song.audioUrl);
      song.albumIndex = i;
    });
    $scope.album = album;
    StatsFactory.totalTime(album)
    .then(function(albumDuration) {
      $scope.fullDuration = albumDuration
    })
  })
  .catch($log.error);

  
  $scope.currentSong = PlayerFactory.getCurrentSong();

  $scope.start = function(song, songList) {
    return PlayerFactory.start(song, songList);
  }
  $scope.pause = function() {
    return PlayerFactory.pause();
  }
  $scope.next = function() {
    return PlayerFactory.next();
  }
  $scope.previous = function() {
    return PlayerFactory.previous();
  }


  $scope.toggle = function(song) {
      $scope.start(song);
  }

  // main toggle
  $scope.toggle = function (song) {
    if ($scope.playing && song === $scope.currentSong) {
      $rootScope.$broadcast('pause');
    } else $rootScope.$broadcast('play', song);
  };

  // incoming events (from Player, toggle, or skip)
  // $scope.$on('pause', $scope.pause);
  // $scope.$on('play', $scope.play);
  // $scope.$on('next', $scope.next);
  // $scope.$on('prev', $scope.prev);

  // functionality
  // function pause () {
  //   $scope.playing = false;
  // }
  // function play (event, song) {
  //   $scope.playing = true;
  //   $scope.currentSong = song;
  // };

  // a "true" modulo that wraps negative to the top of the range
  function mod (num, m) { return ((num % m) + m) % m; };

  // jump `interval` spots in album (negative to go back, default +1)
  // function skip (interval) {
  //   if (!$scope.currentSong) return;
  //   var index = $scope.currentSong.albumIndex;
  //   index = mod( (index + (interval || 1)), $scope.album.songs.length );
  //   $scope.currentSong = $scope.album.songs[index];
  //   if ($scope.playing) $rootScope.$broadcast('play', $scope.currentSong);
  // };
  // function next () { skip(1); };
  // function prev () { skip(-1); };

  // $scope.albumLength = StatsFactory.totalTime($scope.album)
  console.log($scope.fullDuration)

});
