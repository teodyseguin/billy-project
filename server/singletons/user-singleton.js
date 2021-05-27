'use strict';

let user = null;

function setUser(data) {
  user = data;
}

function getUser() {
  return user;
}

module.exports = {
  getUser,
  setUser
};
