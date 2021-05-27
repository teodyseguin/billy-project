'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Redirect, browserHistory, IndexRoute } from 'react-router';

import Home from './containers/Home';
import Login from './containers/Login';
import Signup from './containers/Signup';
import Account from './containers/Account';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path='/' component={Home} />
    <Route path='/login' component={Login} />
    <Route path='/signup' component={Signup} />
    <Route path='/account' component={Account} />
  </Router>
, document.getElementById('app'));
