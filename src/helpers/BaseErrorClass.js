
class BaseErrorClass extends Error {
  constructor(errCode, errMessage, ...args) {
    super(...args);
    Error.captureStackTrace(this, BaseErrorClass);
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


module.exports = BaseErrorClass;
