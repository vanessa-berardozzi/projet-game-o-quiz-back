const { Sequelize } = require('sequelize');
const { Quiz } = require('../models');

/* eslint-disable no-console */

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
    } catch (error) { // in case of an error
      console.trace(error);
      // Return a 500 error code and a message explaining the problem
      return res.status(500).json({ error: 'Unexpected server error. Please try again later.' });
    }
  },

  // Returns the most popular quizzes, currently in random order
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
