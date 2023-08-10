/* eslint-disable no-console */
const { User } = require('../models');

const scoreController = {

  getScore: async (req, res) => {
    const { score, userId } = req.body;
    try {
      const user = await User.findByPk(userId);
      console.log('Données de user reçues :', user);

      if (!user) {
        return res.status(404).json({ error: 'User not found. Please verify the provided id.' });
      }
      else {
        const userScore = await user.increment({ 'quiz_done': 1, 'score': score });


        return res.status(200).json({ message: "Score mis à jour", userScore });
      };
    } catch (error) { // en cas de problème
      console.trace(error);
      // On retourne un code erreur 500 et un message expliquant le problème
      return res.status(500).json({ error: 'Unexpected server error. Please try again later.' });
    }
  },

};

module.exports = scoreController;
