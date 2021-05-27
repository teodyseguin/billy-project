/**
 * Actions.
 */

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

export function attach(data) {
  return {
    type: ATTACH,
    data,
  };
}

export function attachRemove() {
  return {
    type: ATTACH_REMOVE
  };
}

export function upload() {
  return {
    type: UPLOAD,
  };
}

export function uploadOk(data) {
  return {
    type: UPLOAD_OK,
    data,
  };
}

export function uploadNoError(data) {
  return {
    type: UPLOAD_NO_ERROR,
    data,
  };
}

export function uploadNotOk(data) {
  return {
    type: UPLOAD_NOT_OK,
    data,
  };
}

export function uploadError(data) {
  return {
    type: UPLOAD_ERROR,
    data,
  };
}

export function apiChange(data) {
  return {
    type: API_CHANGE,
    data,
  };
}

export function csvUpdate(data) {
  return {
    type: CSV_UPDATE,
    data,
  };
}

export function setPreparedData(data) {
  return {
    type: SET_PREPARED_DATA,
    data,
  };
}

export function manualMappingStarted() {
  return {
    type: MANUAL_MAPPING_STARTED
  }
}

export function spinner(data) {
  return {
    type: SPINNER,
    data
  };
}

export function setMessage(data) {
  return {
    type: SET_MESSAGE,
    data
  };
}

export function setSpinnerMessage(data) {
  return {
    type: SET_SPINNER_MESSAGE,
    data
  };
}
