const jwt = require('jsonwebtoken');
const User = require('mongoose').model('User');
const PassportLocalStrategy = require('passport-local').Strategy;
const config = require('../../config');
const { t } = require('localizify');
const bcrypt = require('bcrypt');

/**
 * Return the Passport Local Strategy object.
 */
module.exports = new PassportLocalStrategy({
  usernameField: 'name',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
}, (req, name, password, done) => {
  const userData = {
    name: name.trim(),
    password: password.trim(),
    currentpwd:req.body.currentpwd.trim(),
  };
var result = null;
  async function returnResult(){
  // find a user by name address
  return await User.findOne({ name: userData.name }, (err, user) => {
    const errors = {};
    if (err) { return done(err); }

    function save() {
        //hash and update password
        return bcrypt.genSalt((saltError, salt) => {
          if (saltError) { return next(saltError); }
          return bcrypt.hash(userData.password, salt, (hashError, hash) => {
            if (hashError) { return next(hashError); }
            var myquery = { name: userData.name }
            // replace a password string with hash value
            var newvalues = { $set: { password: hash } }
            User.updateOne(myquery, newvalues, function(err, res){
              if (err) { return done(err); } 
              return done(null);
            })
          });
    })};

    if (!user) {
      const error = new Error('Incorrect name');
      error.name = t('error');
      error.errors = {}
      error.errors.password = t('wrongEmail');
      return done(error);
    }

    // check if a hashed user's password is equal to a value saved in the database
    return user.comparePassword(userData.currentpwd, (passwordErr, isMatch) => {
      if (err) { return done(err); }
      if (!isMatch) {
        const error = new Error(t('matchPassword'));
        error.name = t('error');
        error.errors = {}
        error.errors.currentpwd = t('matchPassword');
        return done(error);
      }
      else{
        save()
      }
    });

    // // check if a hashed user's password is equal to a value saved in the database
    // return user.comparePassword(userData.password, (passwordErr, isMatch) => {
    //   if (err) { return done(err); }
    //   if (isMatch) {
    //     console.log('samePassword')
    //     const error = new Error(t('samePassword'));
    //     error.name = t('error');
    //     error.errors = {}
    //     error.errors.password = t('samePassword');
    //     return done(error);
    //   }
    //   else{
    //     save()
    //   }
    // });
  });
}

return returnResult();
});