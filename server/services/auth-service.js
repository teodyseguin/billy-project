'use strict';

const LocalStrategy = require('passport-local').Strategy;
const UserService = require('./user-service').UserService;
const logger = require('../utils').logger;

let User = null;
let modelInstance = null;

function deserializeUser(id, callback) {
  modelInstance.findById(
    {
      _id: id
    },
    '-password',
    (err, user) => {
      if (err) {
        logger(err, 'debug');
        callback(err, null);
      }
      else {
        callback(err, user);
      }
    }
  );
}

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  else {
    res.status(401);
    res.type('txt').send('Access denied');
  }
}

function localStrategy() {
  if (User == null) {
    User = UserService.getUser();
  }

  if (modelInstance == null) {
    modelInstance = User.getUserModel();
  }

  const localStrategy = new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, modelInstance.verifyMatch);

  return localStrategy;
}

function serializeUser(user, done) {
  done(null, user._id);
}

module.exports = {
  deserializeUser,
  ensureAuthenticated,
  localStrategy,
  serializeUser
};
