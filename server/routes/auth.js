const express = require('express');
const validator = require('validator');
const passport = require('passport');
const router = new express.Router();
const { t } = require('localizify');
const bcrypt = require('bcrypt');
const User = require('mongoose').model('User');
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

module.exports = router;