'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router'; 

import { createUser } from './operations';

import Navbar from '../../components/Navbar';
import Form from '../../components/Form';
import InputText from '../../components/InputText';
import InputPassword from '../../components/InputPassword';
import Button from '../../components/Button';
import ButtonWrapper from '../../components/ButtonWrapper';
import Footer from '../../components/Footer';

export default class Login extends React.PureComponent {
  constructor() {
    super();

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    };
  }
  changeFirstName(e) {
    const firstName = e.target.value;

    this.setState({ firstName });
  }

  changeLastName(e) {
    const lastName = e.target.value;

    this.setState({ lastName });
  }

  changeEmail(e) {
    const email = e.target.value;

    this.setState({ email });
  }

  changePassword(e) {
    const password = e.target.value;

    this.setState({ password });
  }

  signup() {
    const payload = JSON.stringify(this.state);

    createUser({ payload });
  }

  render() {
    return (
      <div className="row text-left">

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

          <Form className="text-center anonymous__signup-form">
            <h2 className="text-left">SIGN UP</h2>

            <div className='form-group'>
              <InputText
                value={this.state.firstName}
                placeholder={'First Name'}
                onChange={(e) => this.changeFirstName(e)} className={'form-control'} />
            </div>

            <div className='form-group'>
              <InputText
                value={this.state.lastName}
                placeholder={'Last Name'}
                onChange={(e) => this.changeLastName(e)} className={'form-control'} />
            </div>

            <div className='form-group'>
              <InputText
                value={this.state.email}
                placeholder={'E-mail'}
                onChange={(e) => this.changeEmail(e)} className={'form-control'} />
            </div>

            <div className='form-group'>
              <InputPassword
                value={this.state.password}
                placeholder={'Password'}
                onChange={(e) => this.changePassword(e)} className={'form-control'} />
            </div>

            <Button
              type={'button'}
              buttonLabel={'Create Account'}
              onClick={(e) => this.signup(e)}
              className={'btn btn-primary ml-1 mr-1'} />

            <ButtonWrapper className="btn">
              <Link to="/login" className="mx-auto">LOG IN</Link>
            </ButtonWrapper>
          </Form>
        </div>

        <Footer className="footer" />
      </div>
    );
  }
}
