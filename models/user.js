module.exports = function(sequelize, Sequelize) {
    const user = sequelize.define('user', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        firstname: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        lastname: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        alias: {
            type: Sequelize.TEXT
        },
        email: {
            type: Sequelize.STRING,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        status: {
            type: Sequelize.ENUM('active', 'inactive'),
            defaultValue: 'inactive'
        }
    });
// Class level method
    user.classLevelMethod = function(x, y) {
        return x + y + '';
    };

// Instance level method
    user.prototype.getFullName = function() {
        return this.firstname + ' ' + this.lastname;
    };
    return user;
};