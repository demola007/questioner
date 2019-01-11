//const express = require('express');
import express from 'express';
//const HttpStatus = require('http-status-codes');
import HttpStatus from 'http-status-codes'
//const Validator = require('validatorjs');
import Validator from 'validatorjs'

//const getModule = require('../../modules');
import getModule from '../../controllers'
//const responseHelper = require('../../helpers/responseHelper');
import responseHelper from '../../helpers/responseHelper'

const meetupModule = getModule('meetups');
const router = express.Router();

const createMeetupDataValidateRules = {
  location: 'required',
  images: 'array',
  topic: 'required',
  happeningOn: 'required',
  tags: 'required',
};

const rsvpMeetupValidateRules = {
  meetup: 'required|integer',
  response: 'required',
  
};

/* GET: get all meetups  */
router.get('/', async (req, res) => {
  try {
    const meetups = await meetupModule.getMeetups();
    return responseHelper.endResponse(res, HttpStatus.OK, meetups);
  } catch (error) {
    return responseHelper.endResponse(res, HttpStatus.INTERNAL_SERVER_ERROR);
  }
});

/* GET: get a specific meetup  */
router.get('/:id(\\d+)', async (req, res) => {
  try {
    const meetup = await meetupModule.getMeetup(req.params.id);
    return responseHelper.endResponse(res, HttpStatus.OK, meetup);
  } catch (error) {
    if (error instanceof meetupModule.MeetupNotFoundError) {
      return responseHelper.endResponse(res, HttpStatus.NOT_FOUND,
        error.getMessage());
    }
    return responseHelper.endResponse(res, HttpStatus.INTERNAL_SERVER_ERROR);
  }
});

/* GET: get a upcoming meetups for a user */
router.get('/upcoming', async (req, res) => {
  try {
    const meetup = await meetupModule.getUpcomingMeetups(req.getUserId());
    return responseHelper.endResponse(res, HttpStatus.OK, meetup);
  } catch (error) {
    if (error instanceof meetupModule.MeetupNotFoundError) {
      return responseHelper.endResponse(res, HttpStatus.NOT_FOUND,
        error.getMessage());
    }
    return responseHelper.endResponse(res, HttpStatus.INTERNAL_SERVER_ERROR);
  }
});


/* POST: create a  meetup. */
router.post('/', async (req, res) => {
  const validation = new Validator(req.body, createMeetupDataValidateRules);
  if (validation.fails()) {
    return responseHelper.endResponse(res, HttpStatus.UNPROCESSABLE_ENTITY, validation.errors);
  }
  try {
    const user = req.getUserId();
    const meetupData = { ...req.body, user };
    const meetup = await meetupModule.createMeetup(meetupData);
    return responseHelper.endResponse(res, HttpStatus.OK, meetup);
  } catch (error) {
    return responseHelper.endResponse(res, HttpStatus.INTERNAL_SERVER_ERROR);
  }
});

/* POST: RSVP  a  meetup. */
router.post('/:meetupid/rsvps', async (req, res) => {
  const validation = new Validator(req.body, rsvpMeetupValidateRules);
  if (validation.fails()) {
    return responseHelper.endResponse(res, HttpStatus.UNPROCESSABLE_ENTITY, validation.errors);
  }
  try {
    const user = req.getUserId();
    const rsvpData = { ...req.body, user };

    const rsvp = await meetupModule.meetupRSVP(rsvpData);
    return responseHelper.endResponse(res, HttpStatus.OK, rsvp);
  } catch (error) {
    if (error instanceof meetupModule.MeetupNotFoundError) {
      return responseHelper.endResponse(res, HttpStatus.NOT_FOUND,
        error.getMessage());
    }
    if (error instanceof meetupModule.RSVPError) {
      return responseHelper.endResponse(res, HttpStatus.FORBIDDEN,
        error.getMessage());
    }
    return responseHelper.endResponse(res, HttpStatus.INTERNAL_SERVER_ERROR);
  }
});

//module.exports = router;
export default router;
