const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const config = require('./config');
const localizify = require('localizify');
const en = require('./server/constants/en.json');
const sk = require('./server/constants/sk.json');

// connect to the database and load models
require('./server/models').connect(config.dbUri);

const app = express();
// tell the app to look for static files in these directories
app.use(express.static('./server/static/'));
app.use(express.static('./client/dist/'));

// tell the app to parse HTTP body messages
app.use(bodyParser.urlencoded({ extended: false }));
// pass the passport middleware
app.use(passport.initialize());
app.get("/*", function(req, res) {
  res.sendFile(__dirname + '/server/static/index.html')
  })

//localizify
app.use((request, response, next) => {
    const lang = request.headers['accept-language'] || 'en_US';
    localizify.setLocale(lang);
    next();
});

localizify
  .add('en_US', en)
  .add('sk_SK', sk)
  .setLocale('en_US');

// load passport strategies
const localSignupStrategy = require('./server/passport/local-signup');
const localLoginStrategy = require('./server/passport/local-login');
const localChangePassportStrategy = require('./server/passport/local-changePwd');
passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);
passport.use('local-changepwd', localChangePassportStrategy);

// pass the authenticaion checker middleware
const authCheckMiddleware = require('./server/middleware/auth-check');
app.use('/api', authCheckMiddleware);

// routes
const authRoutes = require('./server/routes/auth');
const apiRoutes = require('./server/routes/api');
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);

// if(process.env.NODE_ENV !== 'production') {
//   process.once('uncaughtException', function(err) {
//     console.error('FATAL: Uncaught exception.');
//     console.error(err.stack||err);
//     setTimeout(function(){
//       process.exit(1);
//     }, 100);
//   });
// }

// start the server
app.listen(process.env.PORT || 3000, () => {
  console.log('Server is running on http://localhost:3000 or http://127.0.0.1:3000');
});