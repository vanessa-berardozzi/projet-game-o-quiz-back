const { User } = require('../models');

/* eslint-disable no-console */

const scoreController = {

  getScore: async (req, res) => {
    const { score, userId } = req.body;
    try {
      const user = await User.findByPk(userId);
      console.log('Received user data:', user);

      if (!user) {
        return res.status(404).json({ error: 'User not found. Please verify the provided id.' });
      }
      else {
        const userScore = await user.increment({ 'quiz_done': 1, 'score': score });

        return res.status(200).json({ message: "Score updated", userScore });
      };
    } catch (error) { // in case of an issue
      console.trace(error);
      // Return a 500 error code and a message explaining the problem
      return res.status(500).json({ error: 'Unexpected server error. Please try again later.' });
    }
  },

};

module.exports = scoreController;
