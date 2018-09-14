const User = require('mongoose').model('User');
const Token = require('mongoose').model('Token');
const PassportLocalStrategy = require('passport-local').Strategy;
var nodemailer = require('nodemailer');
var crypto = require('crypto');
const { t } = require('localizify');

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
            if (err) { return done(ErrorEvent) }
            // Send the email
            var transporter = nodemailer.createTransport({ service: 'Sendgrid', auth: { user: 'kejto', pass: process.env.SENDGRID } });
            var mailOptions = { from: 'no-reply@coindome.com', to: newUser.email, subject: t('tokenSubject'), text: 'Hello,\n\n' + t('verifyContent') +' \nhttp:\/\/' + req.headers.host + '\/#\/confirmation\/' + token.token + '.\n' };
            transporter.sendMail(mailOptions, function (err, info) {
              if (err) { return done(ErrorEvent) }
              return res.status(200).json({
                success: true,
                message: t('verify') + newUser.email 
              });
            });
        });

    return done(err, newUser);
  });
});