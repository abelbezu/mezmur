'use strict';
module.exports = function(sequelize, DataTypes) {
  var Track = sequelize.define('Track', {
    trackId: DataTypes.INTEGER,
    albumId: DataTypes.INTEGER,
    trackName: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Track.belongsTo(models.Album, {foreignKey: 'albumId'});
      }
    }
  });
  return Track;
};