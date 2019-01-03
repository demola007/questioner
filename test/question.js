
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
    assert.doesNotThrow(() => questionModule.createQuestion(questionData));
  });

  it('It should return true after creating a question', () => {
    assert.equal(questionModule.createQuestion(questionData), true);
  });
});


describe('get a question [GET /questions :param id<int> ]', () => {
  const questionId = 2;
  const question = questionModule.getQuestion(questionId);
  it('it should return an array of one question', () => {
    assert(question instanceof Array);
  });

  it('length of question returned should be one', () => {
    assert.equal(question.length, 1);
  });
});


describe('upvote a question [PATCH /questions/upvote :param questionId<Integer>,]', () => {
  const questionId = 2;
  const currentUpvote = questionModule.getQuestion(questionId)[0].upvotes;

  it('it should not throw an exception  while upvoting a question', () => {
    assert.doesNotThrow(() => questionModule.upvoteQuestion(questionId));
  });

  const upvotedQuestion = questionModule.upvoteQuestion(questionId);

  it('Upvote count should have increased by one', () => {
    assert.equal(upvotedQuestion.upvotes, (currentUpvote + 1));
  });
});


describe('downvote a question [PATCH /questions/downvote :param questionId<Integer>,]', () => {
  const questionId = 2;
  const currentDownvote = questionModule.getQuestion(questionId)[0].upvotes;

  it('it should not throw an exception  while downvoting a question', () => {
    assert.doesNotThrow(() => questionModule.downvoteQuestion(questionId));
  });

  const downvotedQuestion = questionModule.downvoteQuestion(questionId);

  it('downvote count should have decreased by one', () => {
    assert.equal(downvotedQuestion.upvotes, (currentDownvote - 1));
  });
});
