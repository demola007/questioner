const express = require('express');
const HttpStatus = require('http-status-codes');
const Validator = require('validatorjs');

const getModule = require('../../modules');
const responseHelper = require('../../helpers/responseHelper');

const questionsModule = getModule('questions');
const router = express.Router();

const createQuestionDataValidateRules = {
  createdBy: 'integer|required',
  meetup: 'integer|required',
  title: 'required',
  body: 'required',
  votes: 'integer',
  // createdOn: 'required',
  // id,
};

const upvoteDownVoteValidations = {
  questionId: 'required|integer',
};


/* GET : get all questions. */
router.get('/', async (req, res) => {
  try {
    const questions = await questionsModule.getQuestions();
    return responseHelper.endResponse(res, HttpStatus.OK, questions);
  } catch (error) {
    return responseHelper.endResponse(res, HttpStatus.INTERNAL_SERVER_ERROR);
  }
});

/* POST: create a  question. */
router.post('/', async (req, res) => {
  const validation = new Validator(req.body, createQuestionDataValidateRules);
  if (validation.fails()) {
    return responseHelper.endResponse(res, HttpStatus.UNPROCESSABLE_ENTITY, validation.errors);
  }
  try {
    const question = await questionsModule.createQuestion(req.body);
    return responseHelper.endResponse(res, HttpStatus.OK, question);
  } catch (error) {
    return responseHelper.endResponse(res, HttpStatus.INTERNAL_SERVER_ERROR);
  }
});

/* PATCH: upvote a  question. */
router.patch('/:questionId/upvote', async (req, res) => {
  const validation = new Validator(req.params, upvoteDownVoteValidations);
  if (validation.fails()) {
    return responseHelper.endResponse(res, HttpStatus.UNPROCESSABLE_ENTITY, validation.errors);
  }
  try {
    const question = await questionsModule.voteQuestion(req.params.questionId);
    return responseHelper.endResponse(res, HttpStatus.OK, question);
  } catch (error) {
    if (error instanceof questionsModule.questionNotFoundError) {
      return responseHelper.endResponse(res, HttpStatus.NOT_FOUND, 'question not found');
    }
    return responseHelper.endResponse(res, HttpStatus.INTERNAL_SERVER_ERROR);
  }
});

/* PATCH: downvote a  question. */
router.patch('/:questionId/downvote', async (req, res) => {
  const validation = new Validator(req.params, upvoteDownVoteValidations);
  if (validation.fails()) {
    return responseHelper.endResponse(res, HttpStatus.UNPROCESSABLE_ENTITY, validation.errors);
  }
  try {
    const question = await questionsModule.voteQuestion(req.params.questionId, false);
    return responseHelper.endResponse(res, HttpStatus.OK, question);
  } catch (error) {
    if (error instanceof questionsModule.questionNotFoundError) {
      return responseHelper.endResponse(res, HttpStatus.NOT_FOUND, 'question not found');
    }
    return responseHelper.endResponse(res, HttpStatus.METHOD_FAILURE);
  }
});


module.exports = router;
