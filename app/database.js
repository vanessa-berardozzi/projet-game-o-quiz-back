const { Sequelize } = require('sequelize');
require('dotenv').config();

// On instancie un objet de la classe sequelize
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  // on precise que sequelize doit se connecter à un PostgreSQL
  dialect: 'postgres',
  define: {
    underscored: true,
    updatedAt: 'updated_at',
    createdAt: 'created_at',
  },
});

// Export de l'objet sequelize
module.exports = sequelize;
