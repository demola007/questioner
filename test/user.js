
const assert = require('assert');

const getModule = require('../src/modules');

const userModule = getModule('users');


describe('Authenticate a user with a token', () => {
  const userCorrectToken = 'o45y78werufiodjlkcxeds';
  const userWrongToken = 'o45y78werufiodjlkcxwerfre';

  it('It should return an object after auth a user with correct token', () => {
    assert.equal(userModule.authUser(userCorrectToken) instanceof Object, true);
  });

  it('it should not reject user with correct token', () => {
    assert.doesNotReject(() => userModule.authUser(userCorrectToken));
  });

  it('It should reject on login a user with wrong token', () => {
    assert.rejects(() => userModule.authUser(userWrongToken));
  });
});

describe('login a  user [POST /users/login :param credentials<Object> ]', () => {
  const correctCredentials = {
    email: 'saboki@example.com',
    password: '1111111',
  };

  const wrongCredentials = {
    email: 'saboki@wrong.com',
    password: '111111',
  };

  it('It should return an object after login a user with correct credentials', () => {
    assert.equal(userModule.loginUser(correctCredentials) instanceof Object, true);
  });

  it('it should not  reject login a user with correct credential', async () => {
    await assert.doesNotReject(() => userModule.loginUser(correctCredentials));
  });

  it('It should reject on login a user with wrong credentials', async () => {
    await assert.rejects(() => userModule.loginUser(wrongCredentials));
  });
});

describe('create a new user [POST /users :param userData<Object> ]', () => {
  const userData = {
    id: 1,
    name: 'ProjectX',
    created: '2pm',
    likes: 0,
    upvote: 0,
  };

  it('it should not reject  while creating a new user', async () => {
    await assert.doesNotReject(async () => userModule.createUser(userData));
  });

  it('It should return an object after creating a user', () => {
    assert.equal(userModule.createUser(userData) instanceof Object, true);
  });
});


describe('get a user [GET /users :param userId<Integer> ]', () => {
  const userId = 1;
  const invalidUserId = 500;

  it('it should not throw an exception  while getting a user', async () => {
    await assert.doesNotReject(() => userModule.getUser(userId));
  });

  it('It should return an object after getting a user', async () => {
    await assert.equal(userModule.getUser(userId) instanceof Object, true);
  });

  it('It should reject  for invalid userId', async () => {
    await assert.rejects(() => userModule.getUser(invalidUserId));
  });
});
