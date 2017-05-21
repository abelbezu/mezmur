'use strict';
module.exports = function(sequelize, DataTypes) {
  var Album = sequelize.define('Album', {
    albumId: DataTypes.INTEGER,
    albumName: DataTypes.STRING,
    artistName: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Album.hasMany(models.Track, {foreignKey: 'albumId'})
      }
    }
  });
  return Album;
};