const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');


// Load user model
const User = require('../models/User');

module.exports = function () {
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
            // match user
            User.findOne({ email: email })
                .then((user) => {
                    if (!user) {
                        return done(null, false, { message: 'That email is not registered' });
                    }

                    // match password
                    bcrypt.compare(password, user.password, (err, isMatch) => { // Added a comma here
                        if (err) throw err;

                        if (isMatch) {
                            return done(null, user);
                        } else {
                            return done(null, false, { message: 'Password is incorrect' });
                        }
                    });
                })
                .catch((err) => console.log(err));
        })
    );
    passport.serializeUser(function(user, cb) {
        process.nextTick(function() {
          return cb(null, {
            id: user.id,
            username: user.username,
            picture: user.picture
          });
        });
      });
      
      passport.deserializeUser(function(user, cb) {
        process.nextTick(function() {
          return cb(null, user);
        });
      });
};
