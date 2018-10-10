const passport = require('passport');
const { t } = require('localizify');
const Token = require('mongoose').model('Token');
var crypto = require('crypto');
require('../passport/passport')();
var mailer = require('../utils/other.utils');

var resetController = function(User){
var reset = function(req, res, next) {
    // Find a matching token
    User.findOne({ email: req.params.email }, function (err, user) {
      if (!user) return res.status(400).send({ msg: t('unableVerify') });
      // Create a verification token, save it, and send email
      var token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });
      // Save the token
      token.save(function (err) {
        if (err) { return res.status(500).send({ success: false, message: err.message }); }
        mailer.sendMail(req,res,user,token);
      });
  
   });
  };
  
/// TODO implement FE
var resend = function (req, res, next) {
    User.findOne({ email: req.body.email }, function (err, user) {
      if (!user) return res.status(400).send({ msg: t('unableVerify') });
      if (user.isVerified) return res.status(400).send({ msg:  t('noUserFound') });
  
      // Create a verification token, save it, and send email
      var token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });
  
      // Save the token
      token.save(function (err) {
        if (err) { return res.status(500).send({ success: false, message: err.message }); }
        mailer.sendMail(req,res,user,token);
      });
   });
  };

var changepwd = function (req, res, next) {
    const validationResult = validation.validateProfileForm(req.body);
    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        message: validationResult.message,
        errors: validationResult.errors
      });
    }
  
    return passport.authenticate('local-changepwd', (err) => {
      if (err) {
  
        if (err.name === 'IncorrectCredentialsError') {
          return res.status(400).json({
            success: false,
            message: err.message,
            errors: err.errors
          });
        }
  
        if (err.name === 'MongoError' && err.code === 11000) {
          // the 11000 Mongo code is for a duplication email error
          // the 409 HTTP status code is for conflict error
          if(err.message.indexOf("$email") > -1){
            return res.status(409).json({
              success: false,
              message: t('errors'),
              errors: {
                email: t('emailTaken'), 
              }
            });
          }
          if(err.message.indexOf("$name") > -1){
            return res.status(409).json({
              success: false,
              message: t('errors'),
              errors: {
                name: t('nameTaken')
              }
            });
          }
        }
  
        return res.status(400).json({
          success: false,
          message: t('formProcessError')
        });
      }
      
      return res.status(200).json({
        success: true,
        message: t('registerSucccess')
      });
    })(req, res, next);
  };

var confirmation = function (req, res, next) {
    // Find a matching token
    Token.findOne({ token: req.params.token }, function (err, token) {
      if (!token) return res.status(400).send({ type: 'not-verified', msg: t('unableVerify') });
  
      // If we found a token, find a matching user
      User.findOne({ _id: token._userId }, function (err, user) {
          if (!user) return res.status(400).send({ msg: t('noUserFound') });
          if (user.isVerified) return res.status(400).send({ type: 'already-verified', msg: t('alreadyVerified')});
  
          // Verify and save the user
          user.isVerified = true;
          user.save(function (err) {
              if (err) { return res.status(500).send({ success: false, message: err.message }); }
              return res.status(200).json({
                success: true,
                message: t('verify')
              });
          });
      });
    });
  };

  return{
    reset: reset,
    resend: resend,
    changepwd: changepwd,
    confirmation: confirmation,
  }
}
module.exports = resetController;