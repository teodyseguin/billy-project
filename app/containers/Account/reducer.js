import { fromJS } from 'immutable';
import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';

import {
  FIRSTNAME_CHANGE,
  LASTNAME_CHANGE,
  USERNAME_CHANGE,
  PASSWORD_CHANGE
} from './constants';

const initialState = fromJS({
  firstName: '',
  lastName: '',
  username: '',
  password: ''
});

function accountReducer(state = initialState, action) {
  switch (action.type) {
    case FIRSTNAME_CHANGE:
      return state.set('firstName', action.data);

    case LASTNAME_CHANGE:
      return state.set('lastName', action.data);

    case USERNAME_CHANGE:
      return state.set('username', action.data);

    case PASSWORD_CHANGE:
      return state.set('password', action.data);

    default:
      return state;
  }
}

const store = createStore(accountReducer, applyMiddleware(logger));
export default store;
