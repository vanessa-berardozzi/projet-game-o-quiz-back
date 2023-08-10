/* eslint-disable no-console */

const { Answer, User } = require('../models');

const answerController = {

  getValidQuestion: async (req, res) => {
    const { answers, userId, questions } = req.body;
    const question_id = answers.question_id;

    try {

      //On récupère la réponse qui à is_valid === true avec le question_id correspondant:
      const goodAnswer = await Answer.findOne({
        where: {
          question_id: question_id,
          is_valid: true
        }
      });

      if (answers.is_valid === false) {

        return res.status(200).json({ message: `Mauvaise réponse, la bonne réponse était : ${goodAnswer.description}` });
      }

      if (answers.is_valid === true) {
        return res.status(200).json({ message: 'Bonne réponse !' });
      }
    }
    catch (error) {
      console.trace(error);
      return res.status(500).json({ error: 'Unexpected server error. Please try again later.' });

    }
  },
};

module.exports = answerController;












