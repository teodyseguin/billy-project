'use strict';

let colors = require('colors/safe');

colors.setTheme({
  default: 'white',
  info: 'green',
  error: 'red',
  warn: 'yellow',
  debug: 'blue',
  data: 'cyan',
  input: 'grey'
});


module.exports.respond = (result, response, statusType, statusCode = null, message = null) => {
  if (statusCode) {
    response.status(statusCode);
  }

  response.send({ status: statusType, result, message });
}

module.exports.getUserHome = () => {
  return process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'];
}

module.exports.logger = (messageString, messageType) => {
  if (process.env.NODE_ENV !== 'test' && process.env.NODE_ENV !== 'prod') {

    if (messageType) {
      console.log(colors[messageType]('[' + messageType + ']: ') + messageString);

      if (messageType === 'debug') {
        console.log(colors.debug('>>>>>'));
        console.log(messageString);
        console.log(colors.debug('<<<<<'));
      }
    }
    else {
      console.log(colors['default']('[]' + messageString));
    }

    return;
  }

  return false;
}