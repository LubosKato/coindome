const validator = require('validator');
const { t } = require('localizify');
module.exports = {
/**
 * Validate cahnge password
 *
 * @param {object} payload - the HTTP body message
 * @returns {object} The result of validation. Object contains a boolean validation result,
 *                   errors tips, and a global message for the whole form.
 */
 validateProfileForm: function(payload) {
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
  },
  
  /**
   * Validate the sign up form
   *
   * @param {object} payload - the HTTP body message
   * @returns {object} The result of validation. Object contains a boolean validation result,
   *                   errors tips, and a global message for the whole form.
   */
  validateSignupForm: function(payload) {
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
  },
  
  /**
   * Validate the login form
   *
   * @param {object} payload - the HTTP body message
   * @returns {object} The result of validation. Object contains a boolean validation result,
   *                   errors tips, and a global message for the whole form.
   */
   validateLoginForm: function(payload) {
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
}