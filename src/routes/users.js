//const express = require('express');
import express from 'express';
//const Validator = require('validatorjs');
import Validator from 'validatorjs';
//const HttpStatus = require('http-status-codes');
import HttpStatus from 'http-status-codes';
//const getModule = require('../../modules');
import getModule from '../../controllers';
//const responseHelper = require('../../helpers/responseHelper');
import responseHelper from '../../helpers/responseHelper';

const router = express.Router();
const userModule = getModule('users');


const loginDataValidateRules = {
  password: 'required',
  email: 'required|email',
};

const createUserDataValidateRules = {
  password: 'required',
  email: 'required|email',
  firstname: 'required',
  lastname: 'required',
  othername: 'required',
  phoneNumber: 'numeric',
  username: 'required',
  isAdmin: 'integer',
  
};


/* POST: login user. */
router.post('/login', async (req, res) => {
  const validation = new Validator(req.body, loginDataValidateRules);
  if (validation.fails()) {
    return responseHelper.endResponse(res, HttpStatus.UNPROCESSABLE_ENTITY, validation.errors);
  }
  try {
    const user = await userModule.loginUser(req.body);
    return responseHelper.endResponse(res, HttpStatus.OK, user);
  } catch (error) {
    return responseHelper.endResponse(res, HttpStatus.UNAUTHORIZED);
  }
});


/* POST: create a new users. */
router.post('/', async (req, res) => {
  const validation = new Validator(req.body, createUserDataValidateRules);
  if (validation.fails()) {
    return responseHelper.endResponse(res, HttpStatus.UNPROCESSABLE_ENTITY, validation.errors);
  }
  try {
    const user = await userModule.createUser(req.body);
    return responseHelper.endResponse(res, HttpStatus.OK, user);
  } catch (error) {
    return responseHelper.endResponse(res, HttpStatus.INTERNAL_SERVER_ERROR);
  }
});


//module.exports = router;
exports default router;
