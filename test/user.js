
const assert = require('assert');

const getModule = require('../src/modules');

const userModule = getModule('users');


describe('Authenticate a user with a token', () => {
  const userCorrectToken = 'o45y78werufiodjlkcxeds';
  const userWrongToken = 'o45y78werufiodjlkcxwerfre';

  it('it should not throw an exception  while auth a user with correct token', () => {
    assert.doesNotThrow(() => userModule.authUser(userCorrectToken));
  });

  it('it should not throw an exception  while login a user with wrong token', () => {
    assert.doesNotThrow(() => userModule.authUser(userWrongToken));
  });


  it('It should return an object after auth a user with correct token', () => {
    assert.equal(userModule.authUser(userCorrectToken) instanceof Object, true);
  });

  it('It should return a false after login a user with wrong token', () => {
    assert.equal(userModule.authUser(userWrongToken), false);
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

  it('it should not throw an exception  while login a user with correct credential', () => {
    assert.doesNotThrow(() => userModule.loginUser(correctCredentials));
  });

  it('it should not throw an exception  while login a user with wrong credential', () => {
    assert.doesNotThrow(() => userModule.loginUser(wrongCredentials));
  });

  it('It should return an object after login a user with correct credentials', () => {
    assert.equal(userModule.loginUser(correctCredentials) instanceof Object, true);
  });

  it('It should return a false after login a user with wrong credentials', () => {
    assert.equal(userModule.loginUser(wrongCredentials), false);
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

  it('it should not throw an exception  while creating a new user', () => {
    assert.doesNotThrow(() => userModule.createUser(userData));
  });

  it('It should return an object after creating a user', () => {
    assert.equal(userModule.createUser(userData) instanceof Object, true);
  });
});


describe('get a user [GET /users :param userId<Integer> ]', () => {
  const userId = 1;
  const invalidUserId = 500;

  it('it should not throw an exception  while getting a user', () => {
    assert.doesNotThrow(() => userModule.getUser(userId));
  });

  it('It should return an object after getting a user', () => {
    assert.equal(userModule.getUser(userId) instanceof Object, true);
  });

  it('It should return false for invalid userId', () => {
    assert.equal(userModule.getUser(invalidUserId), false);
  });
});
