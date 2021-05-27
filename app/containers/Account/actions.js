'use strict';

/**
 * Actions.
 */

import {
  FIRSTNAME_CHANGE,
  LASTNAME_CHANGE,
  USERNAME_CHANGE,
  PASSWORD_CHANGE
} from './constants';

export function changeFirstName(data) {
  return {
    type: FIRSTNAME_CHANGE,
    data
  };
}

export function changeLastName(data) {
  return {
    type: LASTNAME_CHANGE,
    data
  };
}

export function changeUserName(data) {
  return {
    type: USERNAME_CHANGE,
    data
  };
}

export function changePassword(data) {
  return {
    type: PASSWORD_CHANGE,
    data
  };
}
