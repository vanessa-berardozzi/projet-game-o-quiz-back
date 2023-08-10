const Sequelize = require('sequelize');

const sequelize = require('../database');

class Question extends Sequelize.Model { }

Question.init({
  description: Sequelize.STRING,
  point: Sequelize.INTEGER,
  quiz_id: Sequelize.INTEGER,
}, {
  sequelize,
  tableName: 'question',
});

module.exports = Question;
