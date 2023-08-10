const Sequelize = require('sequelize');
const sequelize = require('../database');

class Level extends Sequelize.Model { }

Level.init({

  name: Sequelize.STRING,
  color: Sequelize.STRING,
}, {

  sequelize,
  tableName: 'level',
});

// Export du module Level
module.exports = Level;
