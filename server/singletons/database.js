'use strict';

const mongoose = require('mongoose');
const logger = require('../utils').logger;

let connection = null;

function connect(args, callback) {
  const { host, port, dbname, username, password } = args;
  const options = {
    poolSize: 5,
    promiseLibrary: require('bluebird')
  };
  const connectionString = `mongodb://${username}:${password}@${host}:${port}/${dbname}`;

  if (!connection) {
    logger('Establishing a new mLab connection.', 'info');

    connection = mongoose.createConnection(connectionString, options, function connectionError(err) {
      if (err) {
        return callback(err);
      }

      logger('Connection to mLab successful', 'info');
    });
  }
}

function getConnection() {
  if (!connection) {
    return false;
  }

  return connection;
}

module.exports = {
  connect,
  getConnection
};
