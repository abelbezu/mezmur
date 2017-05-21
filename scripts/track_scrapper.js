var scraperjs = require('scraperjs');
var Model = require('../models');
var Album = Model.Album;
var Track = Model.Track;
Album.findAll().then(function(albums){
  albums.forEach(function(album){
    var queryURL = 'http://www.wongelnet.com/lyrics/frame.php?albumId=' + album.albumId;
      scraperjs.StaticScraper.create(queryURL)
      .scrape(function($) {
        var ids = [];
          $('script').map(function(){
            if(this.children.length > 0 && this.children[0].data.includes('/lyrics/lyrics_image.php')){
              this.children[0].data.split('\n').map(function(st){
                if(st.split('=')[2]){
                  ids.push(st.split('=')[2].split("';")[0]);
                }
              });
            }
          })
          $(".list").map(function(index, name) {
            var trackName = this.children[0].data.split(".")[1];
            var trackId = ids[index];
            Track
                  .build({ trackId: trackId,  albumId: album.id, trackName: trackName })
                  .save()
                  .then(anotherTask => {
                     console.log("Saved ", trackName, "  by  ", album.artistName)
                  })
                  .catch(error => {
                    console.log(error);
                  });
              
            
          }).get();

      })
      .then(function(news) {
          console.log(news);
      })

  })
})
