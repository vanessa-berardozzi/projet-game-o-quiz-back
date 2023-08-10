const jwt = require('jsonwebtoken');

const authSecurity = {

  checkToken: async (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ')[1];// 
      const user = jwt.verify(token, process.env.SECRET);
      console.log('Token validé');
      next();
    } catch (error) {
      console.trace(error);
      next(error);
      return res.status(500).json({ error: 'Erreur serveur.' });
    }
  }
};

module.exports = authSecurity;
