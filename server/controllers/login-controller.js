'use strict';

const respond = require('../utils').respond;

function login(request, response) {
  if (request.isAuthenticated()) {
    respond(true, response, 'success', 200, 'Logged in successfully!');
    response.redirect('/');
  }

  response.redirect('/login');

  return;
}

module.exports = {
  login
};
