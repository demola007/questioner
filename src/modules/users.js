
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// const errCodes = require('../helpers/appErrorCodeHelper');
// const errStrings = require('../helpers/repsonseStringHelper');

const CRYPTO_SALT = 8;

// TODO move to .env;
const JWT_SECRET = 'myquestionier-dummyapp';

class UserAuthFailedError extends Error {
  constructor(errCode, errMessage, ...args) {
    super(...args);
    Error.captureStackTrace(this, UserAuthFailedError);
    this.errorCode = errCode;
    this.errMessage = errMessage;
  }

  getErrorCode() {
    return this.errorCode;
  }

  getCustomeMessage() {
    return this.errMessage;
  }
}

// Important todo user error codes;

class UserNotFoundError extends Error {
  constructor(errCode, errMessage, ...args) {
    super(...args);
    Error.captureStackTrace(this, UserAuthFailedError);
    this.errorCode = errCode;
    this.errMessage = errMessage;
  }

  getErrorCode() {
    return this.errorCode;
  }

  getCustomeMessage() {
    return this.errMessage;
  }
}


class User {
  constructor() {
    this.userModel = [];
    this.AuthFailedErr = UserAuthFailedError;
    this.NotFoundErr = UserNotFoundError;
  }

  getUser(userId) {
    return new Promise((resolve, reject) => {
      const user = this.userModel.find(x => x.id === userId);
      if (user) {
        return resolve(User.returnUserData(user));
      }
      return reject(new this.NotFoundErr('user not found'));
    });
  }


  authUser(token) {
    return new Promise((resolve, reject) => {
      const user = this.userModel.find(x => x.jwtToken === token);
      if (user) {
        return resolve(User.returnUserData(user));
      }
      return reject(new this.AuthFailedErr('token is invalid'));
    });
  }

  loginUser(userData) {
    return new Promise((resolve, reject) => {
      const user = this.userModel.find(x => x.email === userData.email);
      if (user) {
        const passwordIsValidbcrypt = bcrypt.compareSync(userData.password, user.password);
        if (!passwordIsValidbcrypt) {
          return reject(new this.AuthFailedErr('password incorrect'));
        }
        const userJwt = User.getSignJWT(user.id);
        return resolve(User.returnUserData({ userJwt, userData: user }));
      }
      return reject(new this.AuthFailedErr('user not found'));
    });
  }

  createUser(userData) {
    return new Promise(async (resolve) => {
      userData.id = this.userModel.length;
      const userJwt = User.getSignJWT(userData.id);
      userData.password = bcrypt.hashSync(userData.password, CRYPTO_SALT);
      this.userModel.push(userData);
      return resolve({ userJwt, userData: User.returnUserData(userData) });
    });
  }

  static returnUserData(userData) {
    const getUserData = {};
    Object.assign(getUserData, userData);

    // do stuff with userData
    delete getUserData.password;
    return getUserData;
  }

  static getSignJWT(userId) {
    return jwt.sign({ id: userId }, JWT_SECRET, {
      // expires in 365 days
      expiresIn: '365d',
    });
  }
}

module.exports = User;
