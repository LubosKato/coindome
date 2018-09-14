const express = require('express');
const validator = require('validator');
const passport = require('passport');
const router = new express.Router();
const { t } = require('localizify');
const { graphiqlExpress } = require('apollo-server-express');
var { generateToken, sendToken } = require('../utils/token.utils');
const Token = require('mongoose').model('Token');
const User = require('mongoose').model('User');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
require('../passport/passport')();

/**
 * Validate cahnge password
 *
 * @param {object} payload - the HTTP body message
 * @returns {object} The result of validation. Object contains a boolean validation result,
 *                   errors tips, and a global message for the whole form.
 */
function validateProfileForm(payload) {
  const errors = {};
  let isFormValid = true;
  let message = '';

  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length < 8) {
    isFormValid = false;
    errors.password = t('password');
  }
  if (!payload || typeof payload.currentpwd !== 'string' || payload.currentpwd.trim().length < 8) {
    isFormValid = false;
    errors.currPassword = t('password');
  }

  if (!payload || typeof payload.name !== 'string' || payload.name.trim().length === 0) {
    isFormValid = false;
    errors.name =  t('name');
  }

  if (!isFormValid) {
    message =  t('errors');
  }

  return {
    success: isFormValid,
    message,
    errors
  };
}

/**
 * Validate the sign up form
 *
 * @param {object} payload - the HTTP body message
 * @returns {object} The result of validation. Object contains a boolean validation result,
 *                   errors tips, and a global message for the whole form.
 */
function validateSignupForm(payload) {
  const errors = {};
  let isFormValid = true;
  let message = '';

  if (!payload || typeof payload.email !== 'string' || !validator.isEmail(payload.email)) {
    isFormValid = false;
    errors.email = t('email');
  }

  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length < 8) {
    isFormValid = false;
    errors.password = t('password');
  }

  if (!payload || typeof payload.name !== 'string' || payload.name.trim().length === 0) {
    isFormValid = false;
    errors.name =  t('name');
  }

  if (!isFormValid) {
    message =  t('errors');
  }

  return {
    success: isFormValid,
    message,
    errors
  };
}

/**
 * Validate the login form
 *
 * @param {object} payload - the HTTP body message
 * @returns {object} The result of validation. Object contains a boolean validation result,
 *                   errors tips, and a global message for the whole form.
 */
function validateLoginForm(payload) {
  const errors = {};
  let isFormValid = true;
  let message = '';

  if (!payload || typeof payload.email !== 'string' || payload.email.trim().length === 0) {
    isFormValid = false;
    errors.email = t('emailLogin');
  }

  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length === 0) {
    isFormValid = false;
    errors.password = t('nameLogin');
  }

  if (!isFormValid) {
    message = t('errors');
  }

  return {
    success: isFormValid,
    message,
    errors
  };
}

router.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql'
}))

router.post('/signup', (req, res, next) => {
  const validationResult = validateSignupForm(req.body);
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    });
  }

  return passport.authenticate('local-signup', (err) => {
    if (err) {
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
});

router.post('/login', (req, res, next) => {
  const validationResult = validateLoginForm(req.body);
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    });
  }

  return passport.authenticate('local-login', (err, token, userData) => {
    if (err) {
      if (err.name === 'IncorrectCredentialsError') {
        return res.status(400).json({
          success: false,
          message: err.message
        });
      }

      return res.status(400).json({
        success: false,
        message: t('formProcessError')
      });
    }
    
    return res.json({
      success: true,
      message: t('loginSucccess'),
      token,
      user: userData
    });
  })(req, res, next);
});

router.get('/getuser/:token', (req, res, next) => {
  // Find a matching token
  Token.findOne({ token: req.params.token }, function (err, token) {
    if (!token) return res.status(400).send({ type: 'not-verified', msg: t('unableVerify') });

    // If we found a token, find a matching user
    User.findOne({ _id: token._userId }, function (err, user) {
        if (!user) return res.status(400).send({ msg: t('noUserFound') });
            if (err) { return res.status(500).send({ msg: err.message }); }
            return res.status(200).json({
              email: user.email,
              name: user.name,
            });
        });
    });
});

router.get('/confirmation/:token', (req, res, next) => {
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
});

router.get('/reset/:email', (req, res, next) => {
  // Find a matching token
  User.findOne({ email: req.params.email }, function (err, user) {
    if (!user) return res.status(400).send({ msg: t('unableVerify') });
    // Create a verification token, save it, and send email
    var token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });
    // Save the token
    token.save(function (err) {
      if (err) { return res.status(500).send({ success: false, message: err.message }); }
        // Send the email
        var transporter = nodemailer.createTransport({ service: 'Sendgrid', auth: { user: 'kejto', pass:process.env.SENDGRID} });
        var mailOptions = { from: 'no-reply@coindome.com', to: user.email, subject: t('resetSubject'), text: 'Hello,\n\n' + t('resetBody') +' \nhttp:\/\/' + req.headers.host + '\/#\/reset\/' + token.token + '.\n' };
        transporter.sendMail(mailOptions, function (err) {
            if (err) { return res.status(500).send({ msg: err.message }); }
            return res.status(200).json({
              success: true,
              message: t('resetSent') + user.email 
            });
        });
    });

 });
});

/// TODO implement FE
router.get('/resend', (req, res, next) => {
  User.findOne({ email: req.body.email }, function (err, user) {
    if (!user) return res.status(400).send({ msg: t('unableVerify') });
    if (user.isVerified) return res.status(400).send({ msg:  t('noUserFound') });

    // Create a verification token, save it, and send email
    var token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });

    // Save the token
    token.save(function (err) {
      if (err) { return res.status(500).send({ success: false, message: err.message }); }
        // Send the email
        var transporter = nodemailer.createTransport({ service: 'Sendgrid', auth: { user: 'kejto', pass: process.env.SENDGRID } });
        var mailOptions = { from: 'no-reply@coindome.com', to: user.email, subject: t('tokenSubject'), text: 'Hello,\n\n' + t('verifyContent') +' \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + token.token + '.\n' };
        transporter.sendMail(mailOptions, function (err) {
          if (err) { return res.status(500).send({ success: false, message: err.message }); }
            return res.status(200).json({
              success: true,
              message: t('verify')
            });
        });
    });
 });
});

router.post('/changepwd', (req, res, next) => {
  const validationResult = validateProfileForm(req.body);
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
});

router.route('/facebook').post(passport.authenticate('facebook-token', {session: false}), function(req, res, next) {
        if (!req.user) {
            return res.send(401, t('userNotAuth'));
        }

        req.auth = {
            id: req._id
        };

        next();
    }, generateToken, sendToken);

router.route('/google').post(passport.authenticate('google-token', {session: false}), function(req, res, next) {
        if (!req.user) {
            return res.send(401, t('userNotAuth'));
        }

        req.auth = {
            id: req._id
        };

        next();
    }, generateToken, sendToken);

module.exports = router;