const express = require('express');
const passport = require('passport');
const router = new express.Router();
const { t } = require('localizify');
const { graphiqlExpress } = require('apollo-server-express');
var { generateToken, sendToken } = require('../utils/token.utils');
require('../passport/passport')();
const User = require('mongoose').model('User');
var login_controller = require('../controllers/loginController')(User);
var reset_controller = require('../controllers/resetController')(User);

router.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql'
}))

router.post('/signup', login_controller.signup);
router.post('/login',login_controller.login);
router.get('/getuser/:token', login_controller.getuser);
router.get('/confirmation/:token', reset_controller.confirmation);
router.get('/reset/:email', reset_controller.reset);
router.post('/resend', reset_controller.resend);
router.post('/changepwd', reset_controller.changepwd);

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