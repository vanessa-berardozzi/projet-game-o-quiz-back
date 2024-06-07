/* eslint-disable no-console */
const http = require('http');
require('dotenv').config();
const express = require('express');
const cors = require('cors')
const router = require('./app/routers/router');
const session = require('express-session');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const { swaggerSpecs } = require('./docs/swagger');


// Server configuration
const app = express();
let PORT = process.env.PORT;
if (PORT == null || PORT == "") {
PORT = 3000;
}
const server = http.createServer(app);
app.use(cors())

// Middlewares
app.use(session({
  secret: 'secretCode',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: true }
}));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(router);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Start the server
server.listen(PORT, () => {
  console.log(`Quiz'O'Tron REST API running on  http://localhost:${PORT} OR https://game-o-quiz-9db3a1fb3532.herokuapp.com/`);
});
