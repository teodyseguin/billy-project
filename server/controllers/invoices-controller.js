'use strict';

const _ = require('lodash');
const EventEmitter = require('events');

const Billy = require('../services/billy-service').Billy;
const respond = require('../utils').respond;

class InvoiceVerifiedWatcher extends EventEmitter {}
const watcher = new InvoiceVerifiedWatcher();

let verifiedInvoices = {};
let unverifiedInvoices = {};

watcher.on('invoice verified', (invoice) => {
  const key = invoice.InvoiceNo;

  if (!verifiedInvoices[key]) {
    verifiedInvoices[key] = { lines: [] };
  }

  verifiedInvoices[key].lines.push(invoice);
});

watcher.on('contactno unverified', (invoice) => {
  const key = invoice.InvoiceNo;

  if (!unverifiedInvoices[key]) {
    unverifiedInvoices[key] = { lines: [] };
  }

  unverifiedInvoices[key].lines.push(invoice);
});

watcher.on('productno verified', (invoice) => {
  const key = invoice.InvoiceNo;

  if (!unverifiedInvoices[key]) {
    unverifiedInvoices[key] = { lines: [] };
  }

  unverifiedInvoices[key].lines.push(invoice);
});

async function getProducts(billy) {
  return await billy.request('GET', '/products');
}

async function getContacts(billy, latest = false) {
  return await billy.request('GET', '/contacts');
}

/**
 * Parse the consolidated data and send them for verification.
 */
async function parse(data, billy) {
  const { contacts } = await getContacts(billy);
  const { products } = await getProducts(billy);

  Object.keys(data).forEach((key, index) => {
    const { lines } = data[key];

    Object.keys(lines).forEach((item, index) => {
      const invoice = lines[item];

      verify(contacts, products, invoice, watcher);
    });
  });
}

/**
 * Verify contact no. and product no.
 */
function verify(contacts, products, invoice, watcher) {
  const { ContactNo, ProductNo } = invoice;
  const contactsFound = _.find(contacts, { contactNo: ContactNo });
  const productsFound = _.find(products, { productNo: ProductNo });

  if (contactsFound) {
    if (productsFound) {
      invoice.organizationId = contactsFound.organizationId;
      invoice.contactId = contactsFound.id;
      invoice.productId = productsFound.id;

      watcher.emit('invoice verified', invoice);
    }
    else {
      watcher.emit('productno unverified', invoice);
    }
  }
  else {
    watcher.emit('contactno unverified', invoice);
  }
}

/**
 * Consolidate the items that has a matched invoice no.
 */
function consolidateMatchedData(csvRows) {
  let consolidated = [];

  csvRows.forEach((key, index) => {
    if (consolidated[key.InvoiceNo]) {
      consolidated[key.InvoiceNo].lines.push(key);
    }
    else {
      consolidated[key.InvoiceNo] = { lines: [] };
      consolidated[key.InvoiceNo].lines.push(key);
    }
  });

  return consolidated;
}

async function create(request, response) {
  // prevent them from caching the previous results.
  verifiedInvoices = {};
  unverifiedInvoices = {};

  const { csvRows, apiKey } = request.body;
  const billy = new Billy(apiKey);
  const consolidated = consolidateMatchedData(csvRows);

  await parse(consolidated, billy);
  respond({ verifiedInvoices, unverifiedInvoices }, response, 'success', 200);
}

module.exports = {
  create
};
