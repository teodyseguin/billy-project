'use strict';

const User = require('../models/user-model').User;

let UserObject = null;

const UserService = {
  getUser: function() {
    if (UserObject == null) {
      UserObject = new User();

      return UserObject;
    }

    return UserObject;
  }
};

module.exports.UserService = UserService;
