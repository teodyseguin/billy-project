import { fromJS } from 'immutable';
import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';

import {
  LOGIN_SUBMIT,
  LOGIN_OK,
  USERNAME_CHANGE,
  PASSWORD_CHANGE,
  USER_LOGOUT
} from './constants';

const initialState = fromJS({
  username: '',
  password: '',
  loggedIn: false,
  loginMessage: ''
});

function loginReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUBMIT:
      return state;

    case LOGIN_OK:
      return state
        .set('loginMessage', action.data.message)
        .set('loggedIn', action.data.result);

    case USERNAME_CHANGE:
      return state.set('username', action.data);

    case PASSWORD_CHANGE:
      return state.set('password', action.data);

    case USER_LOGOUT:
      return state
        .set('username', '')
        .set('password', '')
        .set('loggedIn', false);

    default:
      return state;
  }
}

const store = createStore(loginReducer, applyMiddleware(logger));
export default store;
