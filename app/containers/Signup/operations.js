'use strict';

import { browserHistory } from 'react-router';

import * as api from '../../utils/api';
import loginStore from '../Login/reducer';
import accountStore from '../Account/reducer';
import {
  loginOk,
  usernameChange,
  passwordChange
} from '../Login/actions';
import {
  changeFirstName,
  changeLastName
} from '../Account/actions';

export async function createUser(args) {
  const { payload } = args;

  try {
    const data = await api.request('/v1/api/users', 'POST', 'application/json', payload);

    if (data.result) {
      loginStore.dispatch(loginOk(data));
      loginStore.dispatch(usernameChange(data.result.email));
      loginStore.dispatch(passwordChange(data.result.password));
      accountStore.dispatch(changeFirstName(data.result.firstName));
      accountStore.dispatch(changeLastName(data.result.lastName));
      browserHistory.push('/');
    }
  }
  catch (e) {
    
  }
}
