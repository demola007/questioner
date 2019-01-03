
const assert = require('assert');

const getModule = require('../src/modules');

const userModule = getModule('users');


describe('Authenticate a user with a token', () => {
  const userCorrectToken = 'o45y78werufiodjlkcxeds';
  const userWrongToken = 'o45y78werufiodjlkcxwerfre';

  it('it should not throw an exception  while auth a user with correct token', () => {
    assert.doesNotThrow(() => userModule.authUser(userCorrectToken), 'An exception occured while  auth user with correct token');
  });

  it('it should not throw an exception  while login a user with wrong token', () => {
    assert.doesNotThrow(() => userModule.authUser(userWrongToken), 'An exception occured while  auth user with incorrect token');
  });


  it('It should return an object after auth a user with correct token', () => {
    assert.equal(userModule.authUser(userCorrectToken) instanceof Object, true, 'authUser(string) with correct token did not return an object');
  });

  it('It should return a false after login a user with wrong token', () => {
    assert.equal(userModule.authUser(userWrongToken), false, 'authUser(string) with wrong token did not return false');
  });
});

describe('login a  user [POST /users/login :param credentials<Object> ]', () => {
  const correctCredentials = {
    username: '',
    password: '111111',
  };

  const wrongCredentials = {
    username: '',
    password: '111111',
  };

  it('it should not throw an exception  while login a user with correct credential', () => {
    assert.doesNotThrow(() => userModule.loginUser(correctCredentials), 'An exception occured while  login user with correct credentials');
  });

  it('it should not throw an exception  while login a user with wrong credential', () => {
    assert.doesNotThrow(() => userModule.loginUser(wrongCredentials), 'An exception occured while  login user with in correct credentials');
  });

  it('It should return a string after login a user with correct credentials', () => {
    assert.equal(typeof userModule.loginUser(correctCredentials), 'string', 'loginUser(object) did not return a string');
  });

  it('It should return a false after login a user with wrong credentials', () => {
    assert.equal(userModule.loginUser(wrongCredentials), false, 'loginUser(object) did not return a string');
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
    assert.doesNotThrow(() => userModule.createUser(userData), 'An exception occured while creating a new user');
  });

  it('It should return an object after creating a user', () => {
    assert.equal(userModule.createUser(userData) instanceof Object, true, 'createUser(object) did not return an object');
  });
});


describe('get a user [GET /users :param userId<Integer> ]', () => {
  const userId = 1;
  const invalidUserId = 500;

  it('it should not throw an exception  while getting a user', () => {
    assert.doesNotThrow(() => userModule.getUser(userId), 'An exception occured while getting  user');
  });

  it('It should return an object after getting a user', () => {
    assert.equal(userModule.getUser(userId) instanceof Object, true, 'createUser(object) did not return an object');
  });

  it('It should return false for invalid userId', () => {
    assert.equal(userModule.getUser(invalidUserId), false, 'createUser(object) did not return an object');
  });
});
