'use strict';

import { browserHistory } from 'react-router';

import * as api from '../../utils/api';
import store from './reducer';
import accountStore from '../Account/reducer';
import { loginOk, loginNotOk } from './actions';
import { changeFirstName, changeLastName, changeUserName, changePassword } from '../Account/actions';

export async function login(args) {
  const { payload } = args;

  try {
    const data = await api.request('/v1/api/auth', 'POST', 'application/json', payload);
    const payloadRevert = JSON.parse(payload);

    if (data.result) {
      store.dispatch(loginOk(data));
      accountStore.dispatch(changeFirstName(data.result.firstName));
      accountStore.dispatch(changeLastName(data.result.lastName));
      accountStore.dispatch(changeUserName(data.result.email));
      accountStore.dispatch(changePassword(payloadRevert.password));
      storeUser(data);
      browserHistory.push('/');
    }
    else {
      store.dispatch(loginNotOk(data.message));
    }
  }
  catch (e) {
    store.dispatch(loginNotOk(data.message));
  }
}

function storeUser(data) {
  localStorage.setItem('csvoucherUser', JSON.stringify(data));
}
