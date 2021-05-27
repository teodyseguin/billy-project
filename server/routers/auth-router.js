'use strict';

const router = require('express').Router();
const passport = require('passport');

const userSingleton = require('../singletons/user-singleton');
const respond = require('../utils').respond;

router.post('/', passport.authenticate('local'), function(request, response) {
  respond(userSingleton.getUser(), response, 'success', 200, 'User authenticated');
});

module.exports = router;
