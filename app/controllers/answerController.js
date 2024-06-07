const { Answer } = require('../models');
// Get the valid question
const getValidQuestion = async (req, res) => {
  const { answers, userId, questions } = req.body;
  const question_id = answers.question_id;

  try {
    // Find the answer with is_valid === true and matching question_id
    const goodAnswer = await Answer.findOne({
      where: {
        question_id: question_id,
        is_valid: true
      }
    });

    if (answers.is_valid === false) {
      return res.status(200).json({ message: `Wrong answer, the correct answer was: ${goodAnswer.description}` });
    }

    if (answers.is_valid === true) {
      return res.status(200).json({ message: 'Correct answer!' });
    }
  } catch (error) {
    console.trace(error);
    return res.status(500).json({ error: 'Unexpected server error. Please try again later.' });
  }
};

module.exports = {
  getValidQuestion
};
const answerController = {

  getValidQuestion: async (req, res) => {
    const { answers, userId, questions } = req.body;
    const question_id = answers.question_id;


    try {

      // Find the answer with is_valid === true and matching question_id
      const goodAnswer = await Answer.findOne({
        where: {
          question_id: question_id,
          is_valid: true
        }
      });

      if (answers.is_valid === false) {

        return res.status(200).json({ message: `Wrong answer, the good one was : ${goodAnswer.description}` });
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












