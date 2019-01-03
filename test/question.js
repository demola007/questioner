
const assert = require('assert');

const getModule = require('../src/modules');

const questionModule = getModule('questions');


describe('Create a question [POST /questions :param questionData<Object> ]', () => {
  const questionData = {
    id: 1,
    name: 'ProjectX',
    created: '2pm',
    likes: 0,
    upvote: 0,
  };

  it('it should not throw an exception  while creating a new question', () => {
    assert.doesNotThrow(() => questionModule.createQuestion(questionData), 'An exception occured while creating a new question');
  });

  it('It should return true after creating a question', () => {
    assert.equal(questionModule.createQuestion(questionData), true, 'createQuestion(object) did not return true after create');
  });
});


describe('get a question [GET /questions :param id<int> ]', () => {
  const questionId = 2;
  const question = questionModule.getQuestion(questionId);
  it('it should return an array of one question', () => {
    assert(question instanceof Array, 'type returned for getQuestion(id) is not an array');
  });

  it('length of question returned should be one', () => {
    assert.equal(question.length, 1, 'getquestion(id) does not return an array with exactly one element');
  });
});


describe('upvote a question [PATCH /questions/upvote :param questionId<Integer>,]', () => {
  const questionId = 2;
  const currentUpvote = questionModule.getQuestion(questionId)[0].upvotes;

  it('it should not throw an exception  while upvoting a question', () => {
    assert.doesNotThrow(() => questionModule.upvoteQuestion(questionId), 'An exception occured upvoting question');
  });

  const upvotedQuestion = questionModule.upvoteQuestion(questionId);

  it('Upvote count should have increased by one', () => {
    assert.equal(upvotedQuestion.upvotes, (currentUpvote + 1), 'Question upvote count was not incremented by one');
  });
});


describe('downvote a question [PATCH /questions/downvote :param questionId<Integer>,]', () => {
  const questionId = 2;
  const currentDownvote = questionModule.getQuestion(questionId)[0].upvotes;

  it('it should not throw an exception  while downvoting a question', () => {
    assert.doesNotThrow(() => questionModule.downvoteQuestion(questionId), 'An exception occured downvoting question');
  });

  const downvotedQuestion = questionModule.downvoteQuestion(questionId);

  it('downvote count should have decreased by one', () => {
    assert.equal(downvotedQuestion.upvotes, (currentDownvote - 1), 'Question downvote count was not decreased by one');
  });
});
