//Config file for swagger

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Game-O-Quiz API',
      version: '1.0.0',
      description: 'API for Game-O-Quiz project',
    },
    servers: [
      {
        url: 'https://game-o-quiz-9db3a1fb3532.herokuapp.com/',
      },
    ],
  },
  apis: ['./app/routers/router.js'],
};

const specs = swaggerJsDoc(options);

module.exports = (app) => {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));
};
