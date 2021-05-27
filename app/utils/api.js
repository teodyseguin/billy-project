'use strict';

import 'whatwg-fetch';

/**
 * Helper function to check the response status code.
 *
 * @param response
 *   The response object.
 */
function checkStatus(response) {
  return response;
}

/**
 * Helper functiion to return the response in JSON format.
 *
 * @param response
 *   The response object.
 */
function parseJSON(response) {
  return response.json();
}

export async function upload(url, method, data) {
  const requestConfig = {
    method,
    headers: {
      'Content-Length': 0
    },
    body: data
  };

  return fetch(url, requestConfig)
    .then(checkStatus)
    .then(parseJSON);
}

export async function invoices(url, method, type, data) {
  const requestConfig = {
    method,
    headers: {
      'Content-Length': 0,
      'Content-Type': type
    },
    body: data
  };

  return fetch(url, requestConfig)
    .then(checkStatus)
    .then(parseJSON);
}

export async function request(url, method, type, data) {
  const requestConfig = {
    method,
    headers: {
      'Content-Length': 0,
      'Content-Type': type
    },
    body: data
  };

  return fetch(url, requestConfig)
    .then(checkStatus)
    .then(parseJSON);
}
