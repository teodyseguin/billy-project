'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Link, browserHistory } from 'react-router';

import store from './reducer';
import loginStore from '../Login/reducer';
// operations ...
import {
  changeFirstName,
  changeLastName,
  changeUserName,
  changePassword
} from './actions';

import Home from '../Home';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Form from '../../components/Form';
import InputText from '../../components/InputText';
import InputPassword from '../../components/InputPassword';
import Button from '../../components/Button';

export default class Account extends Home {
  changeFirstName(e) {
    const value = e.target.value;

    store.dispatch(changeFirstName(value));
  }

  changeLastName(e) {
    const value = e.target.value;

    store.dispatch(changeLastName(value));
  }

  changeUserName(e) {
    const value = e.target.value;

    store.dispatch(changeUserName(value));
  }

  changePassword(e) {
    const value = e.target.value;

    store.dispatch(changePassword(value));
  }

  save() {}

  render() {
    const loggedIn = loginStore.getState().get('loggedIn');
    const firstName = store.getState().get('firstName');
    const lastName = store.getState().get('lastName');
    const username = store.getState().get('username');
    const password = store.getState().get('password');

    if (!loggedIn) {
      browserHistory.push('/login');

      return null;
    }

    return (
      <div className="mx-auto">
        <Navbar loggedIn={loggedIn} classes={"navbar navbar--logged-in navbar--transparent navbar-toggleable-md navbar-light bg-primary"}>
          <li className="nav-item mr-1">
            <Link className="nav-link" to="/account" activeClassName="active">Account</Link>
          </li>
          <li className="nav-item mr-1">
            <Link className="nav-link" to="/" activeClassName="active" onClick={(e) => super.logout()}>
              Log out
            </Link>
          </li>
        </Navbar>

        <div className="container mt-5 mb-5">
          <div className="row">
            <div className="col-md-5">
              <Form>
                <h2>Personal Profile</h2>

                <div className='form-group'>
                  <InputText
                    defaultValue={firstName}
                    placeholder={'First name'}
                    onChange={(e) => this.changeFirstName(e)} className={'form-control'} />
                </div>

                <div className='form-group'>
                  <InputText
                    defaultValue={lastName}
                    placeholder={'Last name'}
                    onChange={(e) => this.changeLastName(e)} className={'form-control'} />
                </div>

                <hr />

                <h2>Your Login Information</h2>

                <div className='form-group'>
                  <InputText
                    defaultValue={username}
                    placeholder={'Username'}
                    onChange={(e) => this.changeUserName(e)} className={'form-control'} />
                </div>

                <div className='form-group'>
                  <InputPassword
                    defaultValue={password}
                    placeholder={'Password'}
                    onChange={(e) => this.changePassword(e)} className={'form-control'} />
                </div>

                <Button
                  type={'button'}
                  buttonLabel={'SAVE'}
                  onClick={(e) => this.save(e)}
                  className={'btn btn-primary ml-1 mr-1'} />
              </Form>
            </div>
          </div>
        </div>

        <Footer className="footer footer--logged-in mt-5" />
      </div>
    );
  }
}
