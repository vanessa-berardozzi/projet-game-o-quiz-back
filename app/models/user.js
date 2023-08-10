const Sequelize = require('sequelize');
const sequelize = require('../database');

class User extends Sequelize.Model {
  get fullname() {
    return `${this.firstname} ${this.lastname}`;
  }
}

User.init({

  first_name: Sequelize.STRING,
  last_name: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING,
  score: Sequelize.INTEGER,
  quiz_done: Sequelize.INTEGER,
  pseudo: Sequelize.STRING,
  role_id: Sequelize.STRING,

}, {
  sequelize,
  tableName: 'user',
});

module.exports = User;
