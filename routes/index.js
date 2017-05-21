var express = require('express');
var router = express.Router();
var Model = require('../models');
var Album = Model.Album;

/* GET home page. */
router.get('/', function(req, res, next) {
  Album.findAll({order: ['artistName']}).then(function(albums){
    res.render('index', { title: 'Express', albums : albums});
  })
  
});
router.get('/album/:id', function(req, res, next) {
  var albumId = req.params.id;
  Album.find({
    where:{
      albumId: albumId
    },
    include: [{
      model: Model.Track,
    }],
    order: [
    [ Model.Track, 'trackName' ],
    ]
  }).then(function(album){
    res.render('album', { title: 'Express', album : album, firstTrackId : album.Tracks[0].trackId});
  });
  
  
});


module.exports = router;
