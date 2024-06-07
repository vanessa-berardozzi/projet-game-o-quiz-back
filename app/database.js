const { Sequelize } = require('sequelize');
require('dotenv').config();

// We create a new instance of Sequelize
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  // We specify that we use the postgres dialect
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  define: {
    underscored: true,
    updatedAt: 'updated_at',
    createdAt: 'created_at',
  },
});

// We export the instance
module.exports = sequelize;