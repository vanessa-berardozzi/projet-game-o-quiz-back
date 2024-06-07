const { User } = require('../models');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const security = require('../services/security');

const authController = {
  signUp: async (req, res) => {
    try {

      // First, we validate the data entered by the user:

      let validForm = true;

      let formError = [];
      const { email, password, passwordConfirm, first_name, last_name, pseudo } = req.body;
      // We check that all fields are filled:

      if (
        validator.isEmpty(email) ||
        validator.isEmpty(password) ||
        validator.isEmpty(first_name) ||
        validator.isEmpty(last_name) ||
        validator.isEmpty(passwordConfirm) ||
        validator.isEmpty(pseudo)

      ) {
        validForm = false;
        formError.push('All fields are required.')
      }

      // We also check that the email is valid:

      if (!validator.isEmail(email)) {
        validForm = false;
        formError.push('The email is not valid.')
      };

      // We also check that there is a match between the password and PasswordConfirm fields
      if (password !== passwordConfirm) {
        validForm = false;
        formError.push('The passwords do not match.');
      }

      // If the form does not meet the validation conditions, we return an error:
      if (!validForm) {

        return res.status(400).json({ error: formError.join(' ') });
      }

      // We check that the email is not already in use:

      const checkUser = await User.findOne({
        where: {
          email: email
        }
      });

      if (checkUser) {
        return res.status(400).json({ message: 'This email is already in use.' });
      }

      // We check that the pseudo is not already in use:

      const checkPseudo = await User.findOne({
        where: {
          pseudo: pseudo
        }
      });

      if (checkPseudo) {
        return res.status(400).json({ message: 'This pseudo is already in use.' });
      }


      // If the submitted form is valid, we can add the new user:

      // We hash the password:
      const hashedPassword = await bcrypt.hash(password, 10);

      
      // We create the new user:
      const newUser = await User.create({ email, password: hashedPassword, pseudo, first_name, last_name, });


      // We send a response to the client:
      return res.json({ message: 'Your account has been created successfully.' });

    } catch (error) {
      console.trace(error);
      return res.status(500).json({ error: 'Server error.' });
    }
  },

  login: async (req, res) => {

    try {
      // We retrieve the form data:
      const { email, password } = req.body;

      // We check if the email exists in the database:
      const user = await User.findOne({
        where: {
          email: email
        }
      });

      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }

      // We check if the password is correct:
      const validPassword = await bcrypt.compare(password, user.password);

      if (validPassword) {

        // Generating the token:
        const token = jwt.sign(
          {
            user_id: user.id, email: user.email
          },
          process.env.SESSION_SECRET,
          { expiresIn: '2h' }
        );

        user.token = token

        // We store the user in the session:
        req.session.user = user;

        // We send a response to the client:
        res.status(200).json({ user: user, token: token, message: 'You are now logged in.' });

      } else {
        return res.status(400).json({ message: 'Incorrect password.' });
      }


    } catch (error) {
      console.trace(error);
      return res.status(500).json({ error: 'Server error.' });
    }
  },

  logout: async (req, res) => {

    try {
      // We destroy the session:
      req.session.destroy();

      // We send a response to the client:
      return res.json({ message: 'You are now logged out.' });

    } catch (error) {
      console.trace(error);
      return res.status(500).json({ error: 'Server error.' });
    }
  },

  deleteAccount: async (req, res) => {

    try {
      // We retrieve the user's id:
      const userId = req.body.userId;

      // We check if the user exists in the database:
      // SELECT "id", "first_name", "last_name", "email", "password", "score", "quiz_done", "pseudo", "role_id", "created_at", "updated_at" FROM "user" AS "User" WHERE "User"."id" = 45;
      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }

      // We delete the user:
      // DELETE FROM "user" WHERE "id" = useriD
      await user.destroy();

      // We send a response to the client:
      return res.status(200).json({ message: 'Your account has been successfully deleted.' });

    } catch (error) {
      console.trace(error);
      return res.status(500).json({ error: 'Server error.' });
    }
  },
};

module.exports = authController;
