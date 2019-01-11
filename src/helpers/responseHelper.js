const HttpStatus = require('http-status-codes');


const endResponse = (responseObject, statusCode, data) => {
  let response;

  if (statusCode !== HttpStatus.OK) {
    response = {
      error: data,
    };
  } else {
    response = {
      data: [data],
    };
  }
  return responseObject
    .status(statusCode).send({ status: statusCode, ...response });
};

module.exports = {
  endResponse,
};
//export default {endResponse,};
