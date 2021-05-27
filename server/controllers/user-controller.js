'use strict';

const respond = require('../utils').respond;
const UserService = require('../services/user-service').UserService;

function create(request, response) {
  const User = UserService.getUser();
  const modelInstance = User.getUserModel();

  // I just want to make sure that a model is generated
  // and I don't want to continue when it is none
  if (modelInstance) {
    const userModel = new modelInstance(request.body);

    userModel
      .save()
      .then(
        function userResolution(user) {
          respond(user, response, 'success', 200, 'User account created.');
        },
        function userRejection(err) {
          respond(err, response, 'error', 400, 'User account not created');
        }
      );
  }
}

module.exports = {
  create
};
