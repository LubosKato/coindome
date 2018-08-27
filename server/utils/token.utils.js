var jwt = require('jsonwebtoken');
const { t } = require('localizify');
const config = require('../config');

module.exports = {
  generateToken: function(req, res, next) { 
      const payload = {
        sub: req.user._id
      }
      req.token = jwt.sign(payload, config.jwtSecret);
    
      return next();
  },
  sendToken: function(req, res) {
    console.log(req.authInfo.name)
      res.setHeader('x-auth-token', req.token);
      return res.status(200).send({
        success: true,
        message: t('loginSucccess'),
        token: req.token,
        user: {name: req.authInfo.name === undefined ? req.user.name : ''}
      });
  }
};