import { fromJS } from 'immutable';
import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';

import {
  ATTACH,
  ATTACH_REMOVE,
  API_CHANGE,
  UPLOAD,
  UPLOAD_OK,
  UPLOAD_NO_ERROR,
  UPLOAD_NOT_OK,
  UPLOAD_ERROR,
  CSV_UPDATE,
  SET_PREPARED_DATA,
  MANUAL_MAPPING_STARTED,
  SPINNER,
  SET_SPINNER_MESSAGE,
  SET_MESSAGE
} from './constants';

const initialState = fromJS({
  csvData: {},
  csvNotOkData: null,
  csvMessages: {},
  attachment: null,
  attachmentRemove: '',
  apiKey: '',
  preparedData: {},
  manualMapping: false,
  spinner: false,
  spinnerMessage: '',
});

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case ATTACH:
      return state.set('attachment', action.data);

    case ATTACH_REMOVE:
      return state.set('attachment', null);

    case UPLOAD_OK:
      return state.set('csvData', action.data);

    case CSV_UPDATE:
      return state
        .set('csvData', action.data)
        .set('manualMapping', false);

    case UPLOAD_NO_ERROR:
      return state.set('csvMessages', action.data);

    case UPLOAD_NOT_OK:
      return state.set('csvNotOkData', action.data);

    case UPLOAD_ERROR:
      return state.set('csvMessages', action.data);

    case API_CHANGE:
      return state.set('apiKey', action.data);

    case SET_PREPARED_DATA:
      return state.set('preparedData', action.data);

    case MANUAL_MAPPING_STARTED:
      return state.set('manualMapping', true);

    case SPINNER:
      return state.set('spinner', action.data);

    case SET_SPINNER_MESSAGE:
      return state.set('spinnerMessage', action.data);

    case SET_MESSAGE:
      return state.set('csvMessages', action.data);

    default:
      return state;
  }
}

const store = createStore(homeReducer, applyMiddleware(logger));
export default store;
