const Sequelize = require('sequelize');
const sequelize = require('../database');

class Quiz extends Sequelize.Model { }

// Sequelize initialization (see Level for more details)
Quiz.init({
  title: Sequelize.STRING,
  picture: Sequelize.STRING,
  level_id: Sequelize.INTEGER,
  user_id: Sequelize.INTEGER,
  tag_id: Sequelize.INTEGER,
}, {
  sequelize,
  tableName: 'quiz',
});

module.exports = Quiz;
