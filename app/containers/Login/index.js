'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';

import store from './reducer';
import { login } from './operations';
import {
  loginSubmit,
  loginOk,
  usernameChange,
  passwordChange
} from './actions';

import Navbar from '../../components/Navbar';
import Form from '../../components/Form';
import InputText from '../../components/InputText';
import InputPassword from '../../components/InputPassword';
import Button from '../../components/Button';
import ButtonWrapper from '../../components/ButtonWrapper';
import Footer from '../../components/Footer';

export default class Login extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      loginMessage: store.getState().get('loginMessage')
    };
  }

  changeUsername(e) {
    let value = e.target.value;
    store.dispatch(usernameChange(value));
  }

  changePassword(e) {
    let value = e.target.value;
    store.dispatch(passwordChange(value));
  }

  login() {
    const email = store.getState().get('username');
    const password = store.getState().get('password');
    const payload = JSON.stringify({ email, password });

    store.dispatch(loginSubmit());
    login({ payload });
  }

  render() {
    return (
      <div className="row">
        <Navbar classes={"navbar navbar--transparent fixed-top navbar-toggleable-md navbar-light bg-faded"}>
          <li className="nav-item mr-1">
            <Link className="nav-link" to="/login" activeClassName="active">Login</Link>
          </li>
          <li className="nav-item mr-1">
            <Link className="nav-link" to="/signup" activeClassName="active">Signup</Link>
          </li>
        </Navbar>

        <div className="anonymous anonymous-bg">
          <div className="anonymous__overlay"></div>

          <Form onKeyPress={(e) => this.login()} className="anonymous__login-form">
            <h2 className="text-center">LOG IN</h2>

            <div className='form-group'>
              <InputText
                defaultValue=''
                placeholder={'Username'}
                onChange={(e) => this.changeUsername(e)} className={'form-control'} />
            </div>

            <div className='form-group'>
              <InputPassword
                defaultValue=''
                placeholder={'Password'}
                onChange={(e) => this.changePassword(e)} className={'form-control'} />
            </div>

            <Button
              type={'button'}
              buttonLabel={'LOGIN'}
              onClick={(e) => this.login(e)}
              className={'btn btn-primary ml-1 mr-1'} />

            <ButtonWrapper className="btn">
              <Link to="/signup" className="mx-auto">SIGN UP</Link>
            </ButtonWrapper>
          </Form>
        </div>

        <Footer className="footer" />

      </div>
    );
  }
}
