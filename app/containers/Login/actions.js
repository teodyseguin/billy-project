'use strict';

/**
 * Actions.
 */

import {
  LOGIN_SUBMIT,
  LOGIN_OK,
  LOGIN_NOT_OK,
  USERNAME_CHANGE,
  PASSWORD_CHANGE,
  USER_LOGOUT
} from './constants';

export function loginSubmit(data) {
  return {
    type: LOGIN_SUBMIT,
    data
  };
}

export function loginOk(data) {
  return {
    type: LOGIN_OK,
    data
  };
}

export function loginNotOk(data) {
  return {
    type: LOGIN_NOT_OK,
    data
  };
}

export function usernameChange(data) {
  return {
    type: USERNAME_CHANGE,
    data
  };
}

export function passwordChange(data) {
  return {
    type: PASSWORD_CHANGE,
    data
  };
}

export function userLogout() {
  return {
    type: USER_LOGOUT
  };
}
