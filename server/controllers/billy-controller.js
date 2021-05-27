'use strict';

const Billy = require('../services/billy-service').Billy;
const respond = require('../utils').respond;

async function create(request, response) {
  const { verifiedInvoices, apiKey } = request.body;
  const billy = new Billy(apiKey);
  await createInvoices(billy, verifiedInvoices, response);
}

/**
 * Restructure the actual invoice object.
 */
function getLines(invoice) {
  const { lines } = invoice;
  let items = [];
  let invoiceObj = {};

  lines.forEach((key, index) => {
    invoiceObj = {
      invoiceNo: key.InvoiceNo,
      entryDate: key.InvoiceDate,
      contactId: key.contactId,
      organizationId: key.organizationId
    };

    items.push({
      productId: key.productId,
      unitPrice: 0
    });
  });

  invoiceObj.lines = items;

  return invoiceObj;
}

async function createInvoices(billy, invoices, response) {
  let results = [];
  let invoiceKeys = Object.keys(invoices);

  for (let i = 0; i < invoiceKeys.length; i++) {
    const invoice = getLines(invoices[invoiceKeys[i]]);
    const res = await billy.request('POST', '/invoices', { invoice: invoice });

    if (res.meta.success) {
      const { invoices, invoiceLines } = res;
      const data = { invoices, invoiceLines };

      results.push(data);
    }
  }

  respond(results, response, 'success', 200, 'Invoice Creation Successful!');
}

module.exports = {
  create
};
