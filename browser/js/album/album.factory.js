
juke.factory('AlbumFactory', function($http) {
  var albumObj = {}

  albumObj.fetchById = function(albumId) {
    return $http.get('/api/albums/' + albumId + '')
    .then(function(res) {
      return res.data
    })
  }

  albumObj.fetchAll = function() {
    return $http.get('/api/albums')
    .then(function(res) {
      return res.data
    })
    .then(function(albums) {
      return albums.map(function(album) {
        return albumObj.fetchById(album.id)
        .then(function(album1) {

          album.songsNumber = album1.songs.length ; 
          album.name = album1.name;
          album.imageUrl = '/api/albums/' + album1.id + '/image';
          album.songs = album1.songs;
          
          album.songs.forEach(function(song,i) {
            song.audioURL = '/api/songs' + song.id + '/audio';
            song.albumIndex = i ; 
          })
          return album;
        })
      })
    })
    .then(function(albums) {
       return Promise.all(albums) 
    })
    .then(function(albums){
      return albums;
    })

  }

  return albumObj;
  
})
