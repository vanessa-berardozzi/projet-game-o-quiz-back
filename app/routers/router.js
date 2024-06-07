const express = require('express');

const router = express.Router();

const quizController = require('../controllers/quizController');
const tagController = require('../controllers/tagController');
const authController = require('../controllers/authController');
const scoreController = require('../controllers/scoreController');
const answerController = require('../controllers/answerController');
const security = require('../services/security');
const userController = require('../controllers/userController');

/**
 * @swagger
 * tags:
 *  name: Quiz
 * description: Quiz app routes
 *
 */

// Login routes :

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: This endpoint allows a user to sign up
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user email
 *               password:
 *                 type: string
 *                 description: The user password
 *               passwordConfirm:
 *                 type: string
 *                 description: The user password confirmation
 *               first_name:
 *                 type: string
 *                 description: The user first name
 *               last_name:
 *                 type: string
 *                 description: The user last name
 *               pseudo:
 *                 type: string
 *                 description: The user pseudo
 *             required:
 *               - email
 *               - password
 *               - passwordConfirm
 *               - first_name
 *               - last_name
 *               - pseudo
 *     responses:
 *       200:
 *         description: Success message
 *       400:
 *         description: Bad request
 *       500:
 *         description: Unexpected server error
 */
router.post('/signup', authController.signUp);

/**
 * @swagger
 * /login:
 *   post:
 *   summary: This endpoint allows a user to log in
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *               description: The user email
 *             password:
 *               type: string
 *               description: The user password
 *           required:
 *             - email
 *             - password
 *   responses:
 *     200:
 *       description: Success message
 *     401:
 *       description: Unauthorized
 *     500:
 *       description: Unexpected server error
 */
router.post('/login', authController.login, security.checkToken);

/**
 * @swagger
 * /logout:
 *  delete:
 *    summary: This endpoint allows a user to log out
 *  responses:
 *    200:
 *      description: Success message
 *    500:
 *      description: Unexpected server error
 */
router.delete('/logout', authController.logout);

/**
 * @swagger
 * /delete:
 *  delete:
 *    summary: This endpoint allows a user to delete his account
 *  responses:
 *    200:
 *      description: Success message
 *    500:
 *      description: Unexpected server error
 */
router.delete('/delete', authController.deleteAccount);

// User routes :

/**
 * @swagger
 * /pseudo:
 *   patch:
 *   summary: This endpoint allows a user to update his pseudo
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             userId:
 *               type: integer
 *               description: The user id
 *             pseudo:
 *               type: string
 *               description: The user pseudo
 *           required:
 *             - userId
 *             - pseudo
 *   responses:
 *     200:
 *       description: Success message
 *     400:
 *       description: Bad request
 *     500:
 *       description: Unexpected server error
 */
router.patch('/pseudo', userController.getPseudoUpdated);

// Quiz routes :

// Affiche tous les quiz

/**
 * @swagger
 * /quiz:
 *  get:
 *   summary: This endpoint allows to get all quizzes
 *  responses:
 *   200:
 *   description: Success message
 *  500:
 *  description: Unexpected server error
 */
router.get('/quiz', quizController.getAllQuiz);

// Selectione un quiz en particulier

/**
 * @swagger
 * /quiz/{id}:
 *   get:
 *     summary: This endpoint allows to get a specific quiz
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The quiz id
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Success message
 *       400:
 *         description: Bad request
 *       500:
 *         description: Unexpected server error
 */

router.get('/quiz/:id(\\d+)', quizController.getOneQuiz);

// Affiche toutes les questions d'un quiz
/**
 * @swagger
 * /quiz/{id}/questions:
 *   get:
 *     summary: This endpoint allows to get all questions of a specific quiz
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The quiz id
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Success message
 *       400:
 *         description: Bad request
 *       500:
 *         description: Unexpected server error
 */
router.get('/randomquiz', quizController.getRandomQuiz);

// Affiche les quiz les 5 quiz les plus populaires

/**
 * @swagger
 * /popularQuiz:
 *   get:
 *     summary: This endpoint allows to get the 5 most popular quizzes
 *     responses:
 *       200:
 *         description: Success message
 *       500:
 *         description: Unexpected server error
 */
router.get('/popularQuiz', quizController.getPopularQuiz);

/**
 * @swagger
 * /lastquiz:
 *   get:
 *     summary: This endpoint allows to get the last quiz
 *     responses:
 *       200:
 *         description: Success message
 *       500:
 *         description: Unexpected server error
 */
router.get('/lastquiz', quizController.getLastQuiz);

// Route answer :

// Affiche les réponses d'une question d'un quiz
/**
 * @swagger
 * /answer/{id}:
 *   get:
 *     summary: This endpoint allows to get the answers of a question of a quiz
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The question id
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Success message
 *       400:
 *         description: Bad request
 *       500:
 *         description: Unexpected server error
 */
router.get('/answer/:id(\\d+)', answerController.getValidQuestion);

/**
 * @swagger
 * /answer/{id}:
 *   post:
 *     summary: This endpoint allows to get the answers of a question of a quiz
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The question id
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Success message
 *       400:
 *         description: Bad request
 *       500:
 *         description: Unexpected server error
 */
router.post('/answer/:id(\\d+)', answerController.getValidQuestion);

// route score :

// Affiche et met à jours le score d'un utilisateur

/**
 * @swagger
 * /score:
 *   patch:
 *     summary: This endpoint allows to get and update the score of a user
 *     responses:
 *       200:
 *         description: Success message
 *       500:
 *         description: Unexpected server error
 */
router.patch('/score', scoreController.getScore);

// Tag routes :

// Affiche toutes les catégories

/**
 * @swagger
 * /tag:
 *   get:
 *     summary: This endpoint allows to get all tags
 *     responses:
 *       200:
 *         description: Success message
 *       500:
 *         description: Unexpected server error
 */
router.get('/tag', tagController.getAllTag);

// Affiche une catégorie en particulier

/**
 * @swagger
 * /tag/{id}:
 *   get:
 *     summary: This endpoint allows to get a specific tag
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The tag id
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Success message
 *       400:
 *         description: Bad request
 *       500:
 *         description: Unexpected server error
 */
router.get('/tag/:id(\\d+)', tagController.getOneTag);

// Affiche tous les quiz d'une catégorie spécifique

/**
 * @swagger
 * /tag/{id}/quiz:
 *   get:
 *     summary: This endpoint allows to get all quizzes of a specific tag
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The tag id
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Success message
 *       400:
 *         description: Bad request
 *       500:
 *         description: Unexpected server error
 */
router.get('/tag/:id(\\d+)/quiz', tagController.getQuizByTag);

module.exports = router;
