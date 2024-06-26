const { User } = require('../models');

/* eslint-disable no-console */

const userController = {

  getPseudoUpdated: async (req, res) => {
    const { userId, pseudo } = req.body;

    try {
      const user = await User.findByPk(userId);
      console.log('Received user data:', user);

      if (!user) {
        console.log(user)
        return res.status(404).json({ message: 'User not found. Please verify the provided id.' });
      }
      else {
        const pseudoUser = await user.update({ 'pseudo': pseudo });
        return res.status(200).json({ message: "Pseudo updated", pseudoUser });
      };


    } catch (error) { // if an error occurs
      console.trace(error);
      return res.status(500).json({ error: 'Unexpected server error. Please try again later.' });
    }

  },

};

module.exports = userController;
