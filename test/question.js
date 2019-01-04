
const assert = require('assert');

const getModule = require('../src/modules');

const questionModule = getModule('questions');
const questionData = {
  id: 1,
  name: 'ProjectX',
  created: '2pm',
  likes: 0,
  votes: 0,
};

describe('Create a question [POST /questions :param questionData<Object> ]', () => {
  it('it should not throw an exception  while creating a new question', () => {
    assert.doesNotThrow(() => questionModule.createQuestion(questionData));
  });

  it('It should return true after creating a question', async () => {
    const question = await questionModule.createQuestion(questionData);
    assert.deepEqual(question, questionData);
  });
});

describe('get a question [GET /questions :param id<int> ]', () => {
  // add question
  before(() => new Promise((resolve) => {
    const questionAdded = questionModule.createQuestion(questionData);
    resolve(questionAdded);
  }));

  it('it should return a question object', async () => {
    const question = await questionModule.getQuestion(questionData.id);
    assert(question instanceof Object);
  });

  it('it should return same question added earlier', async () => {
    const question = await questionModule.getQuestion(questionData.id);
    assert.deepEqual(question, questionData);
  });
});


describe('votes a question [PATCH /questions/votes :param questionId<Integer>,]', async () => {
  let questionDataBefore = {};
  before(() => new Promise(async (resolve) => {
    questionDataBefore = await questionModule.createQuestion(questionData);
    resolve(questionDataBefore);
  }));


  it('it should not throw an exception  while upvoting a question', async () => {
    await assert.doesNotReject(async () => questionModule.voteQuestion(questionData.id));
  });

  it('votes count should have increased by one', async () => {
    const newQusetionVote = await questionModule.voteQuestion(questionData.id);
    const newQusetionVoteBefore = newQusetionVote.votes;
    const newQusetionVote2 = await questionModule.voteQuestion(questionData.id);

    assert.equal(newQusetionVoteBefore + 1, newQusetionVote2.votes);
  });

  it('it should not throw an exception  while down voting a question', async () => {
    await assert.doesNotReject(async () => questionModule.voteQuestion(questionData.id, true));
  });

  it('votes count should have decreased by one', async () => {
    const newQusetionVote = await questionModule.voteQuestion(questionData.id);
    const newQusetionVoteBefore = newQusetionVote.votes;
    const newQusetionVote2 = await questionModule.voteQuestion(questionData.id, false);

    assert.equal(newQusetionVoteBefore - 1, newQusetionVote2.votes);
  });
});
