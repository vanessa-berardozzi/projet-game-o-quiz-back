const { User } = require('../models');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const security = require('../services/security');


const authController = {

  signUp: async (req, res) => {
    try {

      // Dans un premier temps on controles les données saisies par l'utilisateur:

      let validForm = true;

      let formError = [];
      const { email, password, passwordConfirm, first_name, last_name, pseudo } = req.body;
      // On vérifie que tous les champs sont remplis:

      if (
        validator.isEmpty(email) ||
        validator.isEmpty(password) ||
        validator.isEmpty(first_name) ||
        validator.isEmpty(last_name) ||
        validator.isEmpty(passwordConfirm) ||
        validator.isEmpty(pseudo)

      ) {
        validForm = false;
        formError.push('Tous les champs sont obligatoires.')
      }

      // On vérifie que l'email est valide:

      if (!validator.isEmail(email)) {
        validForm = false;
        formError.push(`L'email n'est pas valide.`)
      };

      // On vérifie aussi qu'il y a une correspondance entre le champ password et PasswordConfirm
      if (password !== passwordConfirm) {
        validForm = false;
        formError.push('Les mots de passe ne sont pas identiques.');
      }

      //Si le formulaire ne répond pas aux conditions de validation, on renvoie une erreur:
      if (!validForm) {

        return res.status(400).json({ error: formError.join(' ') });
      }

      // On vérifie que l'email n'est pas déjà utilisé:

      const checkUser = await User.findOne({
        where: {
          email: email
        }
      });

      if (checkUser) {
        return res.status(400).json({ message: 'Cet email est déjà utilisé.' });
      }

      //On vérifie que le pseudo n'est pas déjà utilisé:

      const checkPseudo = await User.findOne({
        where: {
          pseudo: pseudo
        }
      });

      if (checkPseudo) {
        return res.status(400).json({ message: 'Ce pseudo est déjà utilisé.' });
      }


      // Si tout le formulaire soumis est valide, on peut ajouter le nouvel utilisateur:

      // On hash le mot de passe:
      const hashedPassword = await bcrypt.hash(password, 10);//

      
      // On crée le nouvel utilisateur:
      const newUser = await User.create({ email, password: hashedPassword, pseudo, first_name, last_name, }); 
//En SQL on aurait écrit INSERT INTO user (email, password, pseudo, first_name, last_name) VALUES (email, hashedPassword, pseudo, first_name, last_name);

      // On renvoie une réponse au client:
      return res.statut(200).json({ message: 'Votre compte a bien été créé.' });
s
    } catch (error) {
      console.trace(error);
      return res.status(500).json({ error: 'Erreur serveur.' });
    }
  },

  login: async (req, res) => {

    try {
      // On récupère les données du formulaire:
      const { email, password } = req.body;

      // On vérifie que l'email existe dans la base de données:
      const user = await User.findOne({
        where: {
          email: email
        }
      });

      if (!user) {
        return res.status(400).json({ message: 'Utilisateur introuvable' });
      }

      // On vérifie que le mot de passe est correct:
      const validPassword = await bcrypt.compare(password, user.password);

      if (validPassword) {

        //Génération du token:
        const token = jwt.sign(
          {
            user_id: user.id, email: user.email
          },
          process.env.SESSION_SECRET,
          { expiresIn: '2h' }
        );

        user.token = token

        // On stocke l'utilisateur en session:
        req.session.user = user;

      // On renvoie une réponse au client:
        res.status(200).json({ user: user, token: token, message: 'Vous êtes connecté.' });

      } else {
        return res.status(400).json({ message: 'Mot de passe incorrect.' });
      }


    } catch (error) {
      console.trace(error);
      return res.status(500).json({ error: 'Erreur serveur.' });
    }
  },

  logout: async (req, res) => {

    try {
      // On détruit la session:
      req.session.destroy();

      // On renvoie une réponse au client:
      return res.json({ message: 'Vous êtes déconnecté.' });

    } catch (error) {
      console.trace(error);
      return res.status(500).json({ error: 'Erreur serveur.' });
    }
  },

  deleteAccount: async (req, res) => {

    try {
      // On récupère l'id de l'utilisateur:
      const userId = req.body.userId;

      // On vérifie que l'utilisateur existe dans la base de données:
      //SELECT "id", "first_name", "last_name", "email", "password", "score", "quiz_done", "pseudo", "role_id", "created_at", "updated_at" FROM "user" AS "User" WHERE "User"."id" = 45;
      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(400).json({ message: 'Utilisateur introuvable' });
      }

      // On supprime l'utilisateur:
      //DELETE FROM "user" WHERE "id" = useriD
      await user.destroy();

      // On renvoie une réponse au client:
      return res.status(200).json({ message: 'Votre compte a bien été supprimé.' });

    } catch (error) {
      console.trace(error);
      return res.status(500).json({ error: 'Erreur serveur.' });
    }
  },




};

module.exports = authController;
