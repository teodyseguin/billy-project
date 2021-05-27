const path = require('path');
const formidable = require('formidable');
const fs = require('fs');
const fcsv = require('fast-csv');
const _ = require('lodash');
const EventEmitter = require('events');

const singletons = require('../singletons/csv');
const Billy = require('../services/billy-service').Billy;
const { respond, getUserHome, logger } = require('../utils');

const messages = require('./messages');

class UploadWatcher extends EventEmitter {}
const uploadWatcher = new UploadWatcher();

let message = '';
let initial = 1;

uploadWatcher.on('file uploaded', (args) => {
  const { newFilePath, response } = args;
  let requiredFields = null;
  let requiredPresent = null;
  let csvRows = [];
  let columnNames = {};

  let stream = fs.createReadStream(newFilePath);

  fcsv
    .fromStream(stream, { headers: false, objectMode: true })
    .on('data', (data) => {
      requiredFields = checkRequiredFields(data);

      if (!requiredFields.success) {
        csvRows.push(columnize(data, columnNames));
      }
      else {
        requiredPresent = requiredFields;
        createColumns(requiredFields, columnNames);
      }
    })
    .on('end', () => {
      let obj = null;
      let message = null;

      if (requiredPresent) {
        obj = requiredPresent;
        message = messages['requiredHeadersPresent'];
      }
      else {
        obj = requiredFields;
        message = messages['missingRequiredHeaders'];
      }

      singletons.setCSV(csvRows);

      respond({ requiredFields: obj, csvRows }, response, 'success', 200, message);
    });
});

function createColumns(requiredFields, columnNames) {
  requiredFields.data.forEach((key) => {
    columnNames[key] = '';
  });
}

/**
 * Create column names if the required fields are detected.
 * Otherwise, just return the data back.
 */
function columnize(data, columnNames) {
  if (!Object.keys(columnNames).length) {
    return data;
  }

  let newColumnNames = {};

  Object.keys(columnNames).forEach((key, index) => {
    newColumnNames[key] = data[index];
  });

  return newColumnNames;
}

function getJustRows(csvRows, data) {
  if (initial === 1) {
    csvRows.push(getJustKeys(data));
    csvRows.push(getJustValues(data));
    initial++;
  }
  else {
    csvRows.push(getJustValues(data));
  }
}

/**
 * We need to get the first set of keys from the row object.
 * When the CSV file does not have a header, it uses the first
 * row as the header for all of the succeeding row objects.
 */
function getJustKeys(data) {
  let obj = {};

  Object.keys(data).forEach((key, index) => {
    obj[key] = key;
  });

  return obj;
}

/**
 * For the succeeding row objects, we reassign them to a new object
 * and uses their values as their object keys. We do that because
 * the current keys are actually the keys/values of the first row object.
 */
function getJustValues(data) {
  let obj = {};

  Object.keys(data).forEach((key, index) => {
    obj[data[key]] = data[key];
  });

  return obj;
}

/**
 * Check the uploaded CSV file and verify if it contains the required columns.
 *
 * @param data
 *   a Row class which contains data.
 */
function checkRequiredFields(data) {
  let found = 0;

  ['ContactNo', 'InvoiceDate', 'ProductNo', 'InvoiceNo'].forEach((key) => {
    data.forEach((ky, index) => {
      if (data[index] == key) {
        found = found + 1;
      }
    });
  });

  if (found > 0) {
    return { success: true, data };
  }

  return { success: false, data };
}

/**
 * Uploads the file to the server.
 *
 * @param request
 *   The request object.
 * @param response
 *   The response object.
 */
function upload(request, response) {
  const form = new formidable.IncomingForm();
  const uploadDir = `${getUserHome()}/uploads`;

  let newFilePath = null;

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  form.uploadDir = uploadDir;

  form.on('file', (field, file) => {
    newFilePath = path.join(form.uploadDir, file.name);
    fs.rename(file.path, newFilePath);

    uploadWatcher.emit('file uploaded', { newFilePath, response });
  });

  form.on('error', (error) => {
    respond(error, response, 'error');
    fs.unlink(newFilePath, () => {});
  });

  form.on('end', () => {});

  form.parse(request);
}

module.exports = {
  upload
};
