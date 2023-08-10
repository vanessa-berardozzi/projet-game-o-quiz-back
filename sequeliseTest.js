require('dotenv').config();
const sequelize = require('./app/database');

const {
  User, Quiz, Question, Level,
} = require('./app/models');

const testUser = async () => {
  // on teste de la methode findAll
  const users = await User.findAll();
  console.log(users);
};

testUser();
