'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

export default function InvoiceCard(props) {
  const { ...rest } = props;
  let list = [];

  Object.keys(rest).forEach((key, index) => {
    if (key !== 'organizationId' && key !== 'contactId' && key !== 'productId') {
      list.push(<li key={Math.random()} className="invoice-card__item">{key}: {rest[key]}</li>);
    }
  });

  return (
    <div className="invoice-card mb-3">
      <ul className="invoice-card__list list-unstyled p-3">
        {list}
      </ul>
    </div>
  );
}
