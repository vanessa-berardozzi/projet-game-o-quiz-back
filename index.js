/* eslint-disable no-console */

const http = require('http');
require('dotenv').config();
const express = require('express');
const cors = require('cors')
const router = require('./app/routers/router');
const session = require('express-session');

// Configuration du serveur Web
const app = express();
const PORT = process.env.PORT || 4000;
const server = http.createServer(app); //

//GESTION DES CORS
app.use(cors({ origin: 'http://localhost:5173' }));


// Configuration de la session
app.use(session({
  secret: 'secretCode',
  resave: true,
  saveUninitialized: true,
  cookie: { //secure: true,
    httpOnly: true
  }
}));

// Configuration du body parser
app.use(express.json()) 
app.use(express.urlencoded({ extended: true }));


app.use(router);

// Lancement du serveur
server.listen(PORT, () => {
  console.log(`Quiz'O'Tron REST API running on  http://localhost:${PORT}`);
});
