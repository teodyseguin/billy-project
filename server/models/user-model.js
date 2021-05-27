'use strict';

const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const userSingleton = require('../singletons/user-singleton');
const databaseSingleton = require('../singletons/database');
const logger = require('../utils').logger;
const work_factor = 10;

class User {
  constructor() {
    let self = this;

    // Initialize the schema. We have some immediate validations going on here
    // especially for the email field, as we don't want to accept bogus like email
    self.Schema = mongoose.Schema({
      email: {
        lowercase: true,
        match: [/^.+@.+\..+$/, 'Invalid email address. Emails must look something like "someone@email.com."'],
        require: [true, '{PATH} is required.'],
        type: String,
        message: 'Invalid email address! Please .....',
        unique: 'This email has already been registered. Please use another email.'
      },
      firstName: {
        required: true,
        type: String
      },
      lastName: {
        required: true,
        type: String
      },
      password: {
        minlength: [8, '{PATH} is too short (minimum is {MINLENGTH} characters).'],
        required: [true, '{PATH} is required'],
        type: String
      }
    });

    // We are implementing pre-save process here to generate a salt password
    // equivalent, from the submitted password on the request
    self.Schema.pre('save', function(next) {
      let user = this;

      if (user.isModified('password')) {
        bcrypt.genSalt(work_factor, (err, salt) => {
          if (err) {
            return next(err);
          }

          // hash the password along with our new salt
          bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) {
              return next(err);
            }

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
          });
        });
      }
      else {
        next();
      }
    });

    self.Schema.methods.verifyPassword = function(password, callback) {
      let user = this;

      bcrypt.compare(password, user.password, (err, match) => {
        if (err) {
          return callback(err);
        }

        callback(null, match);
      });
    };

    // We want to make use of the cached connection, which actually
    // happens upon starting the app server, but there must be a
    // fallback, whenever there is no cached connection made
    let connection = databaseSingleton.getConnection();

    if (connection) {
      self.Model = connection.model('users', this.Schema);

      self.Model.verifyMatch = function verifyMatch(email, password, callback) {
        self.Model.findOne({ email }, function(err, user) {
          if (err) {
            return callback(err);
          }

          if (!user) {
            return callback(null, false, { message: 'Incorrect credentials' });
          }

          user.verifyPassword(password, function (err, match) {
            if (err) {
              return callback(err);
            }

            if (!match) {
              return callback(null, false, { message: 'Incorrect credentials' });
            }

            userSingleton.setUser(user);
            return callback(null, user);
          });
        });
      };
    }
  }

  getUserModel() {
    return this.Model;
  }

  getUserSchema() {
    return this.Schema;
  }
}

module.exports.User = User;
