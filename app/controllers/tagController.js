/* eslint-disable no-console */
const { Tag } = require('../models');

const tagController = {

  getAllTag: async (req, res) => {
    try {
      const tag = await Tag.findAll({ include: ['quiz_list'] });
      return res.json(tag);
    } catch (error) {
      console.trace(error);
      return res.status(500).json({ error: 'Unexpected server error. Please try again later.' });
    }
  },

  getOneTag: async (req, res) => {
    const tagId = Number(req.params.id);
    try {
      const tag = await Tag.findByPk(tagId);

      if (!tag) {
        return res.status(404).json({ error: 'Tag not found. Please verify the provided id.' });
      }

      return res.json(tag);
    } catch (error) { // en cas de problème
      console.trace(error);
      // On retourne un code erreur 500 et un message expliquant le problème
      return res.status(500).json({ error: 'Unexpected server error. Please try again later.' });
    }
  },

  getQuizByTag: async (req, res) => {
    const tagId = Number(req.params.id);
    try {
      const tag = await Tag.findByPk(tagId, { include: ['quiz_list'] });
      //En SQL : SELECT * FROM "quiz" WHERE "tag_id" = tagId;

      if (!tag) {
        return res.status(404).json({ error: 'Tag not found. Please verify the provided id.' });
      }

      return res.json(tag);
    } catch (error) { // en cas de problème
      console.trace(error);
      // On retourne un code erreur 500 et un message expliquant le problème
      return res.status(500).json({ error: 'Unexpected server error. Please try again later.' });
    }
  },

};

module.exports = tagController;
