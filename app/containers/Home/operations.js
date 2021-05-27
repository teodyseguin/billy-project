'use strict';

import * as api from '../../utils/api';
import store from './reducer';
import {
  uploadOk,
  uploadNoError,
  uploadNotOk,
  uploadError,
  setPreparedData,
  spinner
} from './actions';

export async function uploadFile(args) {
  const { attachment } = args;

  try {
    const data = await api.upload('/v1/api/upload', 'POST', attachment.formData);
    const message = {
      text: data.message.text,
      type: data.message.type
    };

    if (data.status !== 'error') {
      store.dispatch(uploadOk(data.result));
      store.dispatch(uploadNoError(message));
    }
    else {
      store.dispatch(uploadNotOk(data.result))
      store.dispatch(uploadError(message));
    }
  }
  catch (e) {
    store.dispatch(uploadError(message));
  }
}

export async function verifyInvoices(args) {
  const { payload } = args;

  try {
    const data = await api.invoices('/v1/api/invoices', 'POST', 'application/json', payload);

    storeLocally(data);
    store.dispatch(setPreparedData(data));
    store.dispatch(spinner(false));
  }
  catch (e) {
    alert('Problem occured');
    store.dispatch(uploadError(e));
    store.dispatch(spinner(false));
  }
}

export async function createInvoices(args) {
  const { payload } = args;

  try {
    const data = await api.request('/v1/api/billy', 'POST', 'application/json', payload);
    const message = {
      text: data.message,
      type: data.status
    };

    store.dispatch(uploadNoError(message));
    store.dispatch(spinner(false));

    alert(message.text);
  }
  catch (e) {
    alert('Problem occured!');
    store.dispatch(uploadError(e));
    store.dispatch(spinner(false));
  }
}

function storeLocally(data) {
  localStorage.setItem('csvoucherData', JSON.stringify(data));
}
