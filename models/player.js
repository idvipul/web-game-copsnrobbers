module.exports = function(sequelize, Sequelize) {

    var Player = sequelize.define('player', {

        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },

        gameId: {
            type: Sequelize.STRING

        },

        userId: {
            type:Sequelize.INTEGER

        },

        Xposition: {
            type:Sequelize.INTEGER
        },

        Yposition: {
            type:Sequelize.INTEGER
        },

        playerRole: {
            type:Sequelize.INTEGER
        }

    });

    return Player;

}