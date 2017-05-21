var scraperjs = require('scraperjs');
var Model = require('../models');
var Album = Model.Album;
scraperjs.StaticScraper.create('http://www.wongelnet.com/lyrics/lyrics.php')
    .scrape(function($) {
        return $("tr").map(function() {
            if(this.attribs.id === "even" || this.attribs.id === "odd"){
              if(this.children.length === 5){

                var albumId = this.children[4].children[0].attribs.href.split("=")[1];
                var artistName = this.children[0].children[0].data;
                var albumName = this.children[2].children[0].data ;
                Album
                  .build({ albumId: albumId,  albumName: albumName, artistName: artistName })
                  .save()
                  .then(anotherTask => {
                     console.log("Saved ", albumName, "  by  ", artistName)
                  })
                  .catch(error => {
                    console.log(error);
                  })
              }
            }
        }).get();
    })
    .then(function(news) {
        console.log(news);
    })