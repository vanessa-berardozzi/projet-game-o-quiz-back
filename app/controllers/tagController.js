/* eslint-disable no-console */
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
    } catch (error) {
      console.trace(error);
      return res.status(500).json({ error: 'Unexpected server error. Please try again later.' });
    }
  },

  getQuizByTag: async (req, res) => {
    const tagId = Number(req.params.id);
    try {
      const tag = await Tag.findByPk(tagId, { include: ['quiz_list'] });

      if (!tag) {
        return res.status(404).json({ error: 'Tag not found. Please verify the provided id.' });
      }

      return res.json(tag);
    } catch (error) {
      console.trace(error);
      return res.status(500).json({ error: 'Unexpected server error. Please try again later.' });
    }
  },

};

module.exports = tagController;
