const Sequelize = require('sequelize');
const sequelize = require('../database');

class Answer extends Sequelize.Model { }

Answer.init({
  description: Sequelize.STRING,
  is_valid: Sequelize.BOOLEAN,
  question_id: Sequelize.INTEGER,
}, {
  sequelize,
  tableName: 'answer',
});

module.exports = Answer;
