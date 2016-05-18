'use strict';

juke.factory('PlayerFactory', function(){
  // non-UI logic in here
  var playerObj = {}
  var audio = document.createElement('audio');
  var playing = false ;
  var currentSong = null;
  var songs = null ;
  var progress = 0;
  audio.addEventListener('timeupdate', function() {
  	progress = audio.currentTime / audio.duration ; 
  })

  playerObj.start = function(song, songList) {
  	playerObj.pause();
  	if(song === currentSong) {
  		return audio.play();
  	}
  	currentSong = song ; 
  	audio.src = song.audioUrl;
  	audio.load();
  	audio.play();
  	if(songList) {
  		songs = songList ; 
  	}
  }

  playerObj.pause = function() {
    audio.pause();
    playerObj.toggle();
  }


  playerObj.resume = function() {
  	audio.play();
  	playerObj.toggle();
  }

  playerObj.isPlaying = function() {
  	return playing ; 
  }

  playerObj.toggle = function() {
  	playing = !playing ;
  }

  playerObj.getCurrentSong = function() {
  	return currentSong ; 
  }

  playerObj.next = function() {
	var index = songs.indexOf(currentSong);
	if(index === songs.length-1) {
		playerObj.start(songs[0],songs);
	} else {
		playerObj.start(songs[index+1],songs);
	}
  }

  playerObj.previous = function() {
  	var index = songs.indexOf(currentSong);
	if(index === 0) {
		playerObj.start(songs[songs.length-1],songs);
	} else {
		playerObj.start(songs[index-1],songs);
	}
  }

  playerObj.getProgress = function() {
  	return progress ; 
  }


  return playerObj;

});
