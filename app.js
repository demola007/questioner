//const createError = require('http-errors');
import  createError from 'http-errors';
//const express = require('express');
import express from 'express';
//const path = require('path');
import path from 'path';
//const cookieParser = require('cookie-parser');
import cookie-parser from 'cookie-parser';
//const logger = require('morgan');
import logger from 'morgan';
//const HttpStatus = require('http-status-codes');
import HttpStatus from 'http-status-codes';

//const indexRouter = require('./src/routes/v1/index');
import indexRouter from './src/routes/index';
//const usersRouter = require('./src/routes/v1/users');
import usersRouter from './src/routes/users';

//const meetupsRouter = require('./src/routes/v1/meetups');
import meetupsRouter from './src/routes/meetups';

//const questionsRouter = require('./src/routes/v1/questions');
import questionsRouter from './src/routes/questions';

//const getModule = require('./src/modules');
import getModule from './src/controllers';
//const responseHelper = require('./src/helpers/responseHelper');
import responseHelper from './src/helpers/responseHelper';
//const ErrorStrings = require('./src/helpers/repsonseStringHelper');
import ErrorStrings from './src/helpers/repsonseStringHelper';
//const { getUserId } = require('./src/helpers/sessionHelper');
import {getUserId} from './src/helpers/sessionHelper';


const userModule = getModule('users');
const app = express();


// view engine setup
app.set('views', path.join(__dirname, './src/views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Authenticate request and Add needed data to request object
app.use(async (req, res, next) => {
// routes to exlude from authorization
  if (req.originalUrl === '/v1/users/create-admin'
      || (req.originalUrl === '/v1/users' && req.method === 'POST')
      || (req.originalUrl === '/')
      || (req.originalUrl === '/v1/users/login' && req.method === 'POST')
  ) {
    return next();
  }

  // every other route are authenticated
  // through jwt authentication token
  try {
    const user = await userModule.authUser(req.headers.authtoken);
    if (user) {
      req.userData = user;
      req.getUserId = () => getUserId(req);
      next();
    } else {
      return responseHelper.endResponse(res, HttpStatus.UNAUTHORIZED, ErrorStrings.authFailed);
    }
  } catch (error) {
    if (error instanceof userModule.AuthFailedErr) {
      return responseHelper.endResponse(res, HttpStatus.UNAUTHORIZED, ErrorStrings.authFailed);
    }
    return responseHelper.endResponse(
      res,
      HttpStatus.INTERNAL_SERVER_ERROR, ErrorStrings.internalServerError,
    );
  }
  return false;
});


app.use('/', indexRouter);
app.use('/meetups', meetupsRouter);
app.use('/questions', questionsRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
//export default app;
