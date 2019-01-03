
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
    this.userModel = [
      {
        id: 1,
        name: 'Saboki Demola',
        email: 'saboki@example.com',
        password: '1111111',
        isAdmin: true,
        jwtToken: 'o45y78werufiodjlkcxeds',
      },
      {
        id: 2,
        name: 'Test User',
        email: 'saboki@example.com',
        password: '1111111',
        isAdmin: false,
        jwtToken: 'iejafklnvcfsjdknzv849reiod',
      },
    ];
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
  // TODO.. hash password before push the data;
  // TODO delete password before returning;
    return new Promise((resolve, reject) => {
      const user = this.userModel.find(x => x.password === userData.password
      && x.email === userData.email);
      if (user) {
        return resolve(User.returnUserData(user));
      }
      return reject(new this.AuthFailedErr('user not found'));
    });
  }

  createUser(userData) {
  // validate data;
  // insert;
  // TODO test that data doesnt go through with ovalid input;
  // TODO.. hash password before push the data;
    return new Promise(async (resolve) => {
      this.userModel.push(userData);
      return resolve(this.getUser(userData.id));
    });
  }

  static returnUserData(userData) {
    // const getUserData = {};
    // Object.assign(userData, getUserData);

    // do stuff with userData
    // delete getUserData.password;
    return userData;
  }
}

module.exports = User;
