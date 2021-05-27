import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const TableWrapper = styled.div `
  padding: 15px;
  background-color: #272a31;
  overflow: auto;
  max-height: 250px;
  border-radius: 3px;

  h6 {
    color: #bdb7b9;
    font-weight: bold;
  }

  table {
    color: white;
  }
`;

export default function Table(props) {
  const { caption, headers, rows } = props;
  let row = [];
  let head = [];

  for (let i = 0; i < rows.length; i++) {
    let td = [];
    let column = 0;

    Object.keys(rows[i]).forEach((key) => {
      td.push(
        <td key={Math.random()} data-column={column}>
          {rows[i][key]}
        </td>
      );

      column++;
    });

    row.push(
      <tr key={i} data-tr={i} data-row={JSON.stringify(rows[i])}>{td}</tr>
    );
  }

  for (let i = 0; i < headers.length; i++) {
    head.push(
      <th key={i} className="text-center pr-0 pl-0">{headers[i]}</th>
    );
  }

  return (
    <TableWrapper>
      <h6 className="mb-3 text-center">{caption}</h6>
      <table className="table table-hover">
        <thead><tr>{head}</tr></thead>
        <tbody>{row}</tbody>
      </table>
    </TableWrapper>
  );
}
