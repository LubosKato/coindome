var jwt = require('jsonwebtoken');
const { t } = require('localizify');
const config = require('../config');

module.exports = {
  generateToken: function(req, res, next) {
      //console.log(req)
      const payload = {
        sub: req.user
      };
      req.token = jwt.sign(payload, config.jwtSecret);
      return next();
  },
  sendToken: function(req, res) {
      res.setHeader('x-auth-token', req.token);
      return res.status(200).send({
        success: true,
        message: t('loginSucccess'),
        token: req.token,
        user: {name: req.authInfo.name}
      });
  }
};