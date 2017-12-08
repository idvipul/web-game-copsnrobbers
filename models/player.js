'use strict';
module.exports = (sequelize, DataTypes) => {
  var player = sequelize.define('player', {
    id: {type:DataTypes.INTEGER,
		primaryKey:true},
    game_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    x: DataTypes.INTEGER,
    y: DataTypes.INTEGER,
    player_type: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return player;
};
