'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Link, browserHistory } from 'react-router';
import _ from 'lodash';

import store from './reducer';
import loginStore from '../Login/reducer';
import accountStore from '../Account/reducer';
import {
  uploadFile,
  verifyInvoices,
  createInvoices
} from './operations';

import {
  attach,
  attachRemove,
  upload,
  apiChange,
  csvUpdate,
  setPreparedData,
  manualMappingStarted,
  spinner,
  setSpinnerMessage,
  setMessage,
} from './actions';

import {
  usernameChange,
  passwordChange,
  loginOk,
  userLogout
} from '../Login/actions';

import {
  changeFirstName,
  changeLastName,
  changeUserName,
  changePassword
} from '../Account/actions';

import Navbar from '../../components/Navbar';
import Form from '../../components/Form';
import InputFile from '../../components/InputFile';
import InputText from '../../components/InputText';
import CSVViewer from '../../components/CSVViewer';
import Button from '../../components/Button';
import ButtonWrapper from '../../components/ButtonWrapper';
import HomeArticle from '../../components/HomeArticle';
import Footer from '../../components/Footer';
import InvoiceCard from '../../components/InvoiceCard';
import Spinner from '../../components/Spinner';

export default class Home extends React.PureComponent {
  constructor(props) {
    super(props);

    this.checkUserLocal();
    this.checkDataLocal();

    this.manualMappings = [];

    this.state = {
      csvData: store.getState().get('csvData'),
      csvNotOkData: store.getState().get('csvNotOkData'),
      csvMessages: store.getState().get('csvMessages'),
      apiKey: store.getState().get('apiKey'),
      preparedData: store.getState().get('preparedData'),
      attachment: store.getState().get('attachment'),
      manualMapping: store.getState().get('manualMapping'),
      spinner: store.getState().get('spinner'),
      spinnerMessage: store.getState().get('spinnerMessage'),
      selectedHeaders: [],
      loggedIn: loginStore.getState().get('loggedIn')
    };

    store.subscribe(() => {
      this.setState({
        csvData: store.getState().get('csvData'),
        csvNotOkData: store.getState().get('csvNotOkData'),
        csvMessages: store.getState().get('csvMessages'),
        apiKey: store.getState().get('apiKey'),
        preparedData: store.getState().get('preparedData'),
        attachment: store.getState().get('attachment'),
        manualMapping: store.getState().get('manualMapping'),
        spinner: store.getState().get('spinner'),
        spinnerMessage: store.getState().get('spinnerMessage'),
      });
    });
  }

  anonymous() {
    return (
      <div className="row text-center">

        <Navbar classes={"navbar navbar--anonymous navbar--transparent fixed-top navbar-toggleable-md navbar-light bg-faded"}>
          <li className="nav-item mr-1">
            <Link className="nav-link" to="/login" activeClassName="active">
              Login
            </Link>
          </li>
          <li className="nav-item mr-1">
            <Link className="nav-link" to="/signup" activeClassName="active">
              Signup
            </Link>
          </li>
        </Navbar>

        <div className="anonymous anonymous-bg">
          <div className="anonymous__overlay"></div>

          <HomeArticle />
        </div>

        <Footer className="footer" />
      </div>
    );
  }

  checkUserLocal() {
    let localUser = localStorage.getItem('csvoucherUser');

    if (!localUser) {
      return;
    }

    localUser = JSON.parse(localUser);

    loginStore.dispatch(loginOk(localUser));
    accountStore.dispatch(changeUserName(localUser.result.email));
    accountStore.dispatch(changePassword(localUser.result.password));
    accountStore.dispatch(changeFirstName(localUser.result.firstName));
    accountStore.dispatch(changeLastName(localUser.result.lastName));
  }

  checkDataLocal() {
    let preparedData = localStorage.getItem('csvoucherData');

    if (!preparedData) {
      return;
    }

    preparedData = JSON.parse(preparedData);

    store.dispatch(setPreparedData(preparedData));
  }

  componendDidMount() {
    loginStore.subscribe(() => {
      this.setState({
        loggedIn: loginStore.getState().get('loggedIn')
      });
    });
  }

  onAPIChange(e) {
    let value = e.target.value;
  }

  onSelectChange(e) {
    const selectedHeaders = this.state.selectedHeaders;
    const selectedColumnName = e.target.value;
    e.target.value = e.target.value;
    // e.g. data-select-header=0
    const columnIndex = e.target.dataset.selectHeader;
    const dataRows = document.querySelectorAll(`[data-row]`);

    for (let i = 0; i < dataRows.length; i++) {
      let data = JSON.parse(dataRows[i].dataset.row);

      data[selectedColumnName] = data[columnIndex];
      delete data[columnIndex];

      dataRows[i].dataset.row = JSON.stringify(data);
    }

    selectedHeaders.push(selectedColumnName);
    this.setState({ selectedHeaders });
  }

  clearTable() {
    store.dispatch(csvUpdate({}));
    store.dispatch(attachRemove());
    store.dispatch(apiChange(''));
    document.getElementById('file').value = null;
  }

  saveTable() {
    const newCSVRows = [];
    const dataRows = document.querySelectorAll(`[data-row]`);
    let csvData = store.getState().get('csvData');
    let csvMessages = store.getState().get('csvMessages');

    for (let i = 0; i < dataRows.length; i++) {
      let data = JSON.parse(dataRows[i].dataset.row);

      newCSVRows.push(data);
    }

    csvData.csvRows = newCSVRows;
    csvData.requiredFields.success = true;
    csvMessages.text = 'Table is saved.';
    csvMessages.type = 'success';

    store.dispatch(csvUpdate(csvData));
    store.dispatch(setMessage(csvMessages));
  }

  upload(e) {
    e.preventDefault();
    const attachment = store.getState().get('attachment');

    if (!attachment) {
      alert('There are currently no attachment to upload.');

      return;
    }

    store.dispatch(upload());

    uploadFile({
      attachment: store.getState().get('attachment')
    });
  }

  verify(e) {
    const { csvData } = this.state;
    // @TODO
    // const apiKey = store.getState().get('apiKey');
    const apiKey = document.getElementById('billy-api-key').value;

    if (!apiKey) {
      alert('Billy API Key is missing!');

      return;
    }

    store.dispatch(apiChange(apiKey));
    store.dispatch(spinner(true));
    store.dispatch(setSpinnerMessage('Sending the Invoices for Verifications ...'));

    csvData.apiKey = apiKey;
    const payload = JSON.stringify(csvData);

    verifyInvoices({ payload });
  }

  createToBilly() {
    const preparedData = store.getState().get('preparedData');
    const apiKey = store.getState().get('apiKey');
    const { verifiedInvoices } = preparedData.result;
    const payload = JSON.stringify({ verifiedInvoices, apiKey });

    if (!apiKey) {
      alert('Billy API Key is missing! You are required to Start over.');

      return;
    }

    store.dispatch(spinner(true));
    store.dispatch(setSpinnerMessage('Sending the Invoices to Billy ...'));
    createInvoices({ payload });
  }

  startOver() {
    store.dispatch(setPreparedData({}));
    store.dispatch(csvUpdate({}));
    store.dispatch(attachRemove());
    store.dispatch(apiChange(''));
    localStorage.removeItem('csvoucherData');
  }

  fileAttach(e) {
    const file = e.target.files[0];
    const filename = file.name;
    const filetype = file.type;
    const formData = new FormData();

    formData.append('uploads[]', file, filename);

    store.dispatch(attach({ formData, filename, filetype, }));
  }

  logout() {
    loginStore.dispatch(userLogout());
    this.clearUser();
    window.location = window.location.href;
  }

  clearUser() {
    localStorage.clear();
  }

  createInvoiceCards(preparedData) {
    const { verifiedInvoices, unverifiedInvoices } = preparedData.result;
    const verifiedCards = this.verifiedCards(verifiedInvoices);
    const unverifiedCards = this.unverifiedCards(unverifiedInvoices);

    return { verifiedCards, unverifiedCards };
  }

  verifiedCards(verifiedInvoices) {
    let list = [];

    Object.keys(verifiedInvoices).forEach((id, primaryIndex) => {
      verifiedInvoices[id].lines.forEach((invoice, secondaryIndex) => {
        const { ...rest } = invoice;

        list.push(
          <li key={Math.random()} className="list-inline-item">
            <InvoiceCard { ...rest } />
          </li>
        );
      });
    });

    return list;
  }

  unverifiedCards(unverifiedInvoices) {
    let list = [];

    Object.keys(unverifiedInvoices).forEach((id, primaryIndex) => {
      unverifiedInvoices[id].lines.forEach((invoice, secondaryIndex) => {
        const { ...rest } = invoice;

        list.push(
          <li key={Math.random()} className="list-inline-item">
            <InvoiceCard { ...rest } />
          </li>
        );
      });
    });

    return list;
  }

  getPreparedButtonClass(csvData) {
    return csvData.csvRows
    ? 'btn btn-primary btn-primary--blockified ml-1 mr-1'
    : 'btn btn-primary ml-1 mr-1 hidden';
  }

  getClearButtonClass(csvData) {
    return csvData.csvRows
    ? 'btn btn-primary btn-primary--blockified mb-3 ml-1 mr-1'
    : 'btn btn-primary hidden';
  }

  getInputFileClass(csvData) {
    return csvData.csvRows
    ? 'form-group hidden'
    : 'form-group';
  }

  getBillyFieldClass(csvData) {
    return csvData.csvRows
    ? 'form-control'
    : 'form-control hidden';
  }

  getSaveButtonClass(requiredFields) {
    if (requiredFields) {
      if (requiredFields.success) {
        return 'hidden';
      }
      else {
        return 'btn btn-primary btn-primary--blockified mb-3 ml-1 mr-1';
      }
    }
    else {
      return 'hidden';
    }
  }

  render() {
    const {
      loggedIn,
      csvData,
      csvNotOkData,
      csvMessages,
      preparedData,
      attachment,
      apiKey,
      manualMapping,
      spinner,
      spinnerMessage,
    } = this.state;

    const preparedButtonClass = this.getPreparedButtonClass(csvData);
    const clearButtonClass = this.getClearButtonClass(csvData);
    const inputFileClass = this.getInputFileClass(csvData);
    const billyFieldClass = this.getBillyFieldClass(csvData);
    const requiredFields = csvData.requiredFields;
    const saveButtonClass = this.getSaveButtonClass(requiredFields);

    let stepTitle = <h2 className="pb-3 pt-3">Step 1: Upload CSV</h2>;
    let invoiceCards = null;

    if (!loggedIn) {
      return this.anonymous();
    }

    if (preparedData.result) {
      let verifiedCardsArea = null;
      let unverifiedCardsArea = null;

      stepTitle = <h2 className="pb-3 pt-3">Step 2: Verification</h2>;
      invoiceCards = this.createInvoiceCards(preparedData);

      if (Object.keys(invoiceCards.verifiedCards).length) {
        verifiedCardsArea = <div className="row">
          <div className="col-sm-12 mb-5">
            <h3>Verified Invoices</h3>

            <p className="alert alert-success">
              <strong><i className="fa fa-check mr-1"></i></strong>
              These are the Invoices you can now create to Billy!
            </p>

            <ul className="list-inline">
              {invoiceCards.verifiedCards}
            </ul>

            <ButtonWrapper
              className={'btn btn-success btn-success--blockified'}
              onClick={(e) => this.createToBilly()}>
              <i className="fa fa-paper-plane mr-1"></i><strong>PROCEED TO CREATE INVOICE</strong>
            </ButtonWrapper>
          </div>
        </div>;
      }

      if (Object.keys(invoiceCards.unverifiedCards).length) {
        unverifiedCardsArea = <div className="row">
          <div className="col-sm-12">
            <h3>Unverified Invoices</h3>

            <p className="alert alert-danger">
              <strong><i className="fa fa-exclamation-triangle mr-1"></i></strong>
              These Invoices could probably had a problem with 
              <strong>ContactNo</strong> and <strong>ProductNo.</strong> Check if they exists on Billy.
            </p>

            <ul className="list-inline unverified-list">
              {invoiceCards.unverifiedCards}
            </ul>

            <p className="alert alert-warning">
              <strong><i className="fa fa-exclamation-triangle mr-1"></i>Warning!</strong> 
              Start over will reset everything including the verified Invoice above.
            </p>
          </div>
        </div>;
      }

      return (
        <div className="mx-auto">
          <Navbar loggedIn={loggedIn} classes={"navbar navbar--logged-in navbar--transparent navbar-toggleable-md navbar-light bg-primary"}>
            <li className="nav-item mr-1">
              <Link className="nav-link" to="/account" activeClassName="active">
                Account
              </Link>
            </li>
            <li className="nav-item mr-1">
              <Link className="nav-link" to="/" onClick={(e) => this.logout()}>
                Log out
              </Link>
            </li>
          </Navbar>

          <div className="container">
            <Spinner show={spinner} messages={spinnerMessage} />

            {stepTitle}

            {verifiedCardsArea}

            {unverifiedCardsArea}

            <ButtonWrapper
              className={'btn btn-secondary btn-secondary--blockified'}
              onClick={(e) => this.startOver()}>
              <i className="fa fa-recycle mr-1"></i><strong>START OVER</strong>
            </ButtonWrapper>
          </div>

          <Footer className="footer footer--logged-in mt-5" />
        </div>
      );
    }

    return (
      <div className="mx-auto">

        <Navbar loggedIn={loggedIn} classes={"navbar navbar--logged-in navbar--transparent navbar-toggleable-md navbar-light bg-primary"}>
          <li className="nav-item mr-1">
            <Link className="nav-link" to="/account" activeClassName="active">
              Account
            </Link>
          </li>
          <li className="nav-item mr-1">
            <Link className="nav-link" to="/" onClick={(e) => this.logout()}>
              Log out
            </Link>
          </li>
        </Navbar>

        <div className="container-fluid pb-5">
          <Spinner show={spinner} messages={spinnerMessage} />

          {stepTitle}

          <CSVViewer
            csvData={csvData || null}
            csvNotOkData={csvNotOkData || null}
            csvMessages={csvMessages}
            onSelectChange={(e) => this.onSelectChange(e)} />

          <div className="row row--form">
            <Form className="col-sm-8">

              <div className={inputFileClass}>
                <InputFile
                  accept={'.csv'}
                  onChange={(e) => this.fileAttach(e)}
                  className="form-control" />
              </div>

              <ButtonWrapper
                className={clearButtonClass}
                onClick={(e) => this.clearTable()}>
                <i className="fa fa-times mr-1"></i><strong>CLEAR TABLE</strong>
              </ButtonWrapper>

              <ButtonWrapper
                className={saveButtonClass}
                onClick={(e) => this.saveTable()}>
                <i className="fa fa-floppy-o mr-1"></i><strong>SAVE MANUAL MAPPINGS</strong>
              </ButtonWrapper>

              <div className="form-group">
                <InputText
                  defaultValue=""
                  id="billy-api-key"
                  placeholder={'Billy API Key'}
                  onChange={(e) => this.onAPIChange(e)}
                  className={billyFieldClass} />
              </div>

              <ButtonWrapper
                className="btn btn-primary btn-primary--blockified ml-1 mr-1"
                onClick={(e) => this.upload(e)}>
                <i className="fa fa-upload mr-1"></i><strong>UPLOAD</strong>
              </ButtonWrapper>

              <ButtonWrapper
                className={preparedButtonClass}
                onClick={(e) => this.verify(e)}>
                <i className="fa fa-chevron-right mr-1"></i><strong>NEXT</strong>
              </ButtonWrapper>
            </Form>
          </div>
        </div>

        <Footer className="footer footer--logged-in" />
      </div>
    );
  }
}
