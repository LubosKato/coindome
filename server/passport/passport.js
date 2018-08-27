'use strict';
var passport = require('passport');
var User = require('mongoose').model('User');
var FacebookTokenStrategy = require('passport-facebook-token');
var GoogleTokenStrategy = require('passport-google-token').Strategy;
var config = require('../config');

module.exports = function () {
    passport.use(new FacebookTokenStrategy({
            clientID: config.facebookAuth.clientID,
            clientSecret: config.facebookAuth.clientSecret
        },
        async function (accessToken, refreshToken, profile, done) {
            return await User.findOne({ 'facebookProvider.id': profile.id}, (err, user) => {
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

                return done(null, user, accessToken);
            });   
        }));

    passport.use(new GoogleTokenStrategy({
            clientID: config.googleAuth.clientID,
            clientSecret: config.googleAuth.clientSecret
        },
        async function (accessToken, refreshToken, profile, done) {
            return await User.findOne({ 'googleProvider.id': profile.id }, (err, user) => {
                if (err) { return done(err); }
                const data = {
                    name: profile.displayName
                    }; 

                if (!user) {            
                const userData = {
                    email: profile.emails[0].value,
                    googleProvider: {
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
                
                return done(null, user, accessToken);
            });   
        }));
};
