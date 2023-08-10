/* eslint-disable no-console */
const { Sequelize } = require('sequelize');
const { Quiz } = require('../models');

const quizController = {

  getAllQuiz: async (req, res) => {
    try {
      const quiz = await Quiz.findAll(
        {
          include: ['level', 'tag', {
            association: 'questions',
            include: ['answers'],
          }]
        },
      );
      return res.json(quiz);
    } catch (error) {
      console.trace(error);
      return res.status(

        500,
      ).json({ error: 'Unexpected server error. Please try again later.' });
    }
  },

  getOneQuiz: async (req, res) => {
    const quizId = Number(req.params.id);
    try {
      const quiz = await Quiz.findByPk(quizId, { include: ['level', 'tag', 'user'] });

      if (!quiz) {
        return res.status(404).json({ error: 'Post not found. Please verify the provided id.' });
      }

      return res.json(quiz);
    } catch (error) { // en cas de problème
      console.trace(error);
      // On retourne un code erreur 500 et un message expliquant le problème
      return res.status(500).json({ error: 'Unexpected server error. Please try again later.' });
    }
  },

//Retourne les quiz les plus populaires, pour le moment en random

  getPopularQuiz: async (req, res) => {
    try {
      const quiz = await Quiz.findAll(
        {
          include: ['level', 'tag'],
          order: Sequelize.literal('random()'),
          limit: 5,
        },
      );
      return res.json(quiz);
    } catch (error) {
      console.trace(error);
      return res.status(500).json({ error: 'Unexpected server error. Please try again later.' });
    }
  },

  getRandomQuiz: async (req, res) => {
    try {
      const quiz = await Quiz.findAll(
        {
          include: ['level', 'tag'],
          order: Sequelize.literal('random()'),
          limit: 1,
        },
      );
      return res.json(quiz);
    } catch (error) {
      console.trace(error);
      return res.status(500).json({ error: 'Unexpected server error. Please try again later.' });
    }
  },

  getLastQuiz: async (req, res) => {
    try {
      const quiz = await Quiz.findAll(
        {
          include: ['level', 'tag'],
          order: [['created_at', 'DESC']],
          limit: 5,
        },
      );
      return res.json(quiz);
    } catch (error) {
      console.trace(error);
      return res.status(500).json({ error: 'Unexpected server error. Please try again later.' });
    }
  }
};

module.exports = quizController;
