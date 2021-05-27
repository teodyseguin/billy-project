'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const crypto = require('crypto');
const session = require('express-session');
const fs = require('fs');
const app = express();
const passport = require('passport');

const authService = require('./services/auth-service');

const uploadRouter = require('./routers/upload-router');
const invoicesRouter = require('./routers/invoices-router');
const billyRouter = require('./routers/billy-router');
const loginRouter = require('./routers/login-router');
const authRouter = require('./routers/auth-router');
const userRouter = require('./routers/user-router');

const contents = fs.readFileSync(__dirname + "/" + "config.json");
const config = JSON.parse(contents);
const env = process.env.NODE_ENV || 'dev';

const databaseSingleton = require('./singletons/database');

crypto.randomBytes(48, (err, buffer) => {
  const secret = buffer.toString('hex');

  app.use(session({
    secret,
    resave: true,
    saveUninitialized: false
  }));
});

databaseSingleton.connect(config[env].mongodb, function(err) {
  if (err) {
    logger('Error occur on connecting to mLab', 'warning');
    logger(err, 'debug');

    return;
  }
});

const server = app.listen(3000, () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log(`${host} server running at ${port}`);
});

app.use(passport.initialize());
app.use(passport.session());

passport.use(authService.localStrategy());
passport.serializeUser(authService.serializeUser);
passport.deserializeUser(authService.deserializeUser);

app.use(bodyParser.json());

app.use('/assets', express.static(path.resolve(__dirname + '/../', 'docroot/assets')))

app.get('*', (request, response) => {
  response.sendFile(path.resolve(__dirname + '/../' + 'docroot/index.html'));
});

app.use('/v1/api/upload', uploadRouter);
app.use('/v1/api/invoices', invoicesRouter);
app.use('/v1/api/billy', billyRouter);
app.use('/v1/api/login', loginRouter);
app.use('/v1/api/auth', authRouter);
app.use('/v1/api/users', userRouter);
