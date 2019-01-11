
//const assert = require('assert');
import assert from 'assert';

//const getModule = require('../src/controllers');
import getModule from '../src/controllers'

const userModule = getModule('users');

const userMockData = {
  id: 20,
  password: '111111',
  email: 'saboki11@gmail.com',
  firstname: 'Yusuf',
  lastname: 'Agboola',
  othername: 'Oladipupo',
  username: 'olaar09',
};

describe('Authenticate a user with a token', () => {
  const userWrongToken = 'o45y78werufiodjlkcxwerfre';
  let userData = {};

  beforeEach(() => new Promise(async (resolve) => {
    userData = await userModule.createUser(userMockData);
    resolve(userData);
  }));

  it('it should not reject user with correct token', async () => {
    await assert.doesNotReject(() => userModule.authUser(userData.jwt));
  });

  it('It should reject  auth a user with wrong token', async () => {
    await assert.rejects(() => userModule.authUser(userWrongToken));
  });
});

describe('create a new user [POST /users :param userData<Object> ]', () => {
  it('it should not reject  while creating a new user', async () => {
    await assert.doesNotReject(async () => userModule.createUser(userMockData));
  });

  it('It should return an object after creating a user', () => {
    assert.equal(userModule.createUser(userMockData) instanceof Object, true);
  });
});


describe('get a user [GET /users :param userId<Integer> ]', () => {
  const invalidUserId = 500;

  let user = {};
  beforeEach(() => new Promise(async (resolve) => {
    user = await userModule.createUser(userMockData);
    resolve(user);
  }));

  it('it should not throw an exception  while getting a user', async () => {
    const { userData } = user;
    await assert.doesNotReject(() => userModule.getUser(userData.id));
  });

  it('It should reject  for invalid userId', async () => {
    await assert.rejects(() => userModule.getUser(invalidUserId));
  });
});
