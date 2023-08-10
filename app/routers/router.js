const express = require('express');

const router = express.Router();

const quizController = require('../controllers/quizController');
const tagController = require('../controllers/tagController');
const authController = require('../controllers/authController');
const scoreController = require('../controllers/scoreController');
const answerController = require('../controllers/answerController');
const security = require('../services/security');
const userController = require('../controllers/userController');

// Login routes :
router.post('/signup', authController.signUp);
router.post('/login', authController.login, security.checkToken);
router.delete('/logout', authController.logout);
router.delete('/delete', authController.deleteAccount);

// User routes :
router.patch('/pseudo', userController.getPseudoUpdated);

// Tag routes :

// Affiche toutes les catégories
router.get('/tag', tagController.getAllTag);
// Affiche une catégorie en particulier
router.get('/tag/:id(\\d+)', tagController.getOneTag);
// Affiche tous les quiz d'une catégorie spécifique
router.get('/tag/:id(\\d+)/quiz', tagController.getQuizByTag);


// Quiz routes :

// Affiche tous les quiz
router.get('/quiz', quizController.getAllQuiz);
// Selectione un quiz en particulier
router.get('/quiz/:id(\\d+)', quizController.getOneQuiz);
// Affiche toutes les questions d'un quiz
router.get('/randomquiz', quizController.getRandomQuiz);
// Affiche les quiz les 5 quiz les plus populaires
router.get('/popularQuiz', quizController.getPopularQuiz);
router.get('/lastquiz', quizController.getLastQuiz);


// Route answer :

// Affiche les réponses d'une question d'un quiz
router.get('/answer/:id(\\d+)', answerController.getValidQuestion);
router.post('/answer/:id(\\d+)', answerController.getValidQuestion);


//route score :

// Affiche et met à jours le score d'un utilisateur
router.patch('/score', scoreController.getScore);





module.exports = router;
