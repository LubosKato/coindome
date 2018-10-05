const User = require('mongoose').model('User');
const Token = require('mongoose').model('Token');
const PassportLocalStrategy = require('passport-local').Strategy;
var crypto = require('crypto');
const { t } = require('localizify');
var mailer = require('../utils/other.utils');

/**
 * Return the Passport Local Strategy object.
 */
module.exports = new PassportLocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
}, (req, email, password, done) => {
  const userData = {
    email: email.trim(),
    password: password.trim(),
    name: req.body.name.trim(),
    active: false
  };

  const newUser = new User(userData);
  newUser.save((err) => {
    if (err) { return done(err); } 
        // Create a verification token for this user
        var token = new Token({ _userId: newUser._id, token: crypto.randomBytes(16).toString('hex') });
        // Save the verification token
        token.save(function (err) {
            if (err) { return done(err) }
            mailer.sendMail(req,null,newUser,token);
        });
    return done(err, newUser);
  });
});