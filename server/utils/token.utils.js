var jwt = require('jsonwebtoken');
const { t } = require('localizify');

var createToken = function(auth) {
    return jwt.sign({
            id: auth.id
        }, 'my-secret',
        {
            expiresIn: 60 * 120
        });
};

module.exports = {
  generateToken: function(req, res, next) {
      req.token = createToken(req.auth);
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