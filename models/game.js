module.exports = function(sequelize, Sequelize) {
    const game = sequelize.define('game', {
        id: {
            primaryKey: true,
            type: Sequelize.STRING
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
