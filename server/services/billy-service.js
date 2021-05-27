'use strict';

const axios = require('axios');

class Billy {

  constructor(apiKey) {
    this.apiKey = apiKey;
  }

  async request(method, url, body) {
    try {
      const payload = {
        baseURL: 'https://api.billysbilling.com/v2',
        method,
        url,
        headers: {
          'X-Access-Token': this.apiKey,
          'Content-Type': 'application/json'
        },
        data: body
      };

      const res = await axios(payload);

      if (res.status >= 400) {
        throw new Error(`${method}: ${url} failed with ${res.status} - ${res.data}`);
      }

      return res.data;
    }
    catch (e) {
      console.error(e);
      throw e;
    }
  }

}

module.exports.Billy = Billy;
