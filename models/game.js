module.exports = function(sequelize, Sequelize) {

    var Game = sequelize.define('game', {

        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },

        isAvailable: {
            type: Sequelize.BOOLEAN
            
        }


    });

    return Game;

}
