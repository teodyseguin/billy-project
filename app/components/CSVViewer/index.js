import React from 'react';
import ReactDOM from 'react-dom';
import EventEmitter from 'events';

import Table from '../Table';
import Select from '../Select';

export default class CSVViewer extends React.PureComponent {

  /**
   * Helper function to parse the returned csv data and create a table.
   *
   * @param csvData
   *   An array of objects representing a row from a CSV File.
   */
  parseCSV(csvData) {
    const { onSelectChange } = this.props;
    const { csvRows, requiredFields } = csvData;
    const headerOptions = [
      <option key={Math.random()} value="">Select</option>,
      <option key={Math.random()} value="ContactNo">ContactNo</option>,
      <option key={Math.random()} value="InvoiceDate">InvoiceDate</option>,
      <option key={Math.random()} value="ProductNo">ProductNo</option>,
      <option key={Math.random()} value="InvoiceNo">InvoiceNo</option>,
      <option key={Math.random()} value="Currency">Currency</option>,
      <option key={Math.random()} value="Text">Text</option>,
      <option key={Math.random()} value="TaxRate">TaxRate</option>,
      <option key={Math.random()} value="Count">Count</option>
    ];

    let headerSelectors = [];
    let headers = [];
    let rows = [];
    let counter = 0;

    csvRows.forEach((key, index) => {
      const { ...rest } = key;
      rows.push(rest);
    });

    rows.forEach((rowObject, index) => {
      let options = [];
      let heads = [];
      let selectAuto = false;
      let counter;

      if (requiredFields.success) {
        Object.keys(rowObject).forEach((value2) => {
          options.push(
            <option
              key={Math.random()}
              value={value2}>{value2}
            </option>
          );
        });

        selectAuto = true;
      }

      if (options.length) {
        counter = options.length;
        options = options;
      }
      else {
        counter = headerOptions.length - 1;
        options = headerOptions;
      }

      for (let i = 0; i < counter; i++) {
        heads.push(
          <Select
            selectAuto={selectAuto}
            dataSelectHeader={i}
            onSelectChange={onSelectChange}>
            { options }
          </Select>
        );
      }

      headers = heads;
    });

    return (
      <div className="mt-3 mb-3">
        <Table caption={'CSV Data'} headers={headers} rows={rows} />
      </div>
    );
  }

  outputNotOkay(messages, csvNotOkData) {
    return <div className="csv-viewer csv-viewer--empty mt-3 mb-3 pt-3 pb-3">
      <div className="alert alert-danger">
        {messages}
      </div>
      <div className="alert alert-danger">
        <strong>
          Uploaded CSV file contains: {csvNotOkData.join(', ')} columns.
        </strong>
      </div>
    </div>;
  }

  render() {
    const { csvData, csvNotOkData, csvMessages } = this.props;
    let messages = <strong>CSV contents will appear in here ...</strong>;

    if (csvNotOkData) {
      return this.outputNotOkay(messages, csvNotOkData);
    }

    if (Array.isArray(csvData.csvRows)) {
      let messageType = `alert alert-${csvMessages.type}`;
      let icon = null;

      switch (csvMessages.type) {
        case 'warning':
          icon = <i className="fa fa-exclamation-triangle mr-1"></i>;
          break;
        case 'info':
          icon = <i className="fa fa-info-circle mr-1"></i>;
          break;
        case 'success':
          icon = <i className="fa fa-check mr-1"></i>;
          break;
      }

      messages = <div className={messageType}>
        <strong>{icon}{csvMessages.text}</strong>
      </div>

      return <div className="csv-viewer">
        {messages}
        {this.parseCSV(csvData)}
      </div>;
    }

    return <div className="csv-viewer csv-viewer--empty mt-3 mb-3 pt-3 pb-3">
      <div className="text-center">
        {messages}
      </div>
    </div>;
  }

}
