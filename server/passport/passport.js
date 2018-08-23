'use strict';

var passport = require('passport');
//var TwitterTokenStrategy = require('passport-twitter-token');
var User = require('mongoose').model('User');
var FacebookTokenStrategy = require('passport-facebook-token');
//var GoogleTokenStrategy = require('passport-google-token').Strategy;
var config = require('../config');

module.exports = function () {

    // passport.use(new TwitterTokenStrategy({
    //         consumerKey: config.twitterAuth.consumerKey,
    //         consumerSecret: config.twitterAuth.consumerSecret,
    //         includeEmail: true
    //     },
    //     function (token, tokenSecret, profile, done) {
    //         User.upsertTwitterUser(token, tokenSecret, profile, function(err, user) {
    //             return done(err, user);
    //         });
    //     }));

    passport.use(new FacebookTokenStrategy({
            clientID: config.facebookAuth.clientID,
            clientSecret: config.facebookAuth.clientSecret
        },
        async function (accessToken, refreshToken, profile, done) {

            //User.upsertFbUser(accessToken, refreshToken, profile, function(err, user) {
           //     return done(err, user);
            //});

            // find a user by name address
            return await User.findOne({ 'facebookProvider.id': profile.id}, (err, user) => {
                const errors = {};
                if (err) { return done(err); }
                const data = {
                    name: profile.displayName
                    }; 
                if (!user) {            
                const userData = {
                    email: profile.emails[0].value,
                    facebookProvider: {
                        id: profile.id,
                        token: accessToken
                    },
                    password:'',
                    name: profile.displayName,
                    };
                
                    const newUser = new User(userData);
                    newUser.save((err) => {
                    if (err) { return done(err); }

                    done(null, accessToken, data);
                    });
                }
                
                return done(null, accessToken, user);
            });   

        }));

    // passport.use(new GoogleTokenStrategy({
    //         clientID: config.googleAuth.clientID,
    //         clientSecret: config.googleAuth.clientSecret
    //     },
    //     function (accessToken, refreshToken, profile, done) {
    //         User.upsertGoogleUser(accessToken, refreshToken, profile, function(err, user) {
    //             return done(err, user);
    //         });
    //     }));
};
