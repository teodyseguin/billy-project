import React from 'react';
import ReactDOM from 'react-dom';

export default function Footer(props) {
  const { ...rest } = props;

  return (
    <footer { ...rest }>
      © All Rights Reserved CSVoucher.com
    </footer>
  );
}
