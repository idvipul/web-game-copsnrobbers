'use strict';
/*module.exports = (sequelize, DataTypes) => {
  var tempuser = sequelize.define('tempuser', {
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return tempuser;
};
*/
var bcrypt = require('bcrypt-nodejs');
module exports = function (sequelize, DataTypes) {
  var tempuser = sequelize.define('tempuser', {
    username: {type: DataTypes.STRING, unique: true, validate: {notNull: true, notEmpty: true}},
    password: {type: DataTypes.STRING, validate: {notNull: true, notEmpty: true}},
  },
  {
    classMethods: {
      validPassword: function (password, passwd, done, tempuser) {
        bcrypt.compare(password, passwd, function (err, isMatch) {
          if (err) {
            console.log(err);
          }
          if (isMatch) {
            return done(null, tempuser);
          } else {
            return done(null, false);
          }
        });
      }
    }
  },
  {
    dialect: 'postgres'
  }
  );
};