
class BaseErrorClass extends Error {
  constructor(errMessage, errCode, ...args) {
    super(...args);
    Error.captureStackTrace(this, BaseErrorClass);
    this.errorCode = errCode;
    this.errMessage = errMessage;
  }

  getErrorCode() {
    return this.errorCode;
  }

  getMessage() {
    return this.errMessage;
  }
}
//module.exports = BaseErrorClass;
export default BaseErrorClass;