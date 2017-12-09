module.exports = function(sequelize, Sequelize) {
    const game = sequelize.define('game', {
        id: {
            primaryKey: true,
            type: Sequelize.STRING
        },
        copId: {
            type: Sequelize.INTEGER
        },
        robberId: {
            type: Sequelize.INTEGER
        }
    });

// Class level method
    game.classLevelMethod = function(x, y) {
        return x + y + '';
    };

// Instance level method
    game.prototype.isGameAvailable = function() {
        return this.id;
    };
    return game;
};
