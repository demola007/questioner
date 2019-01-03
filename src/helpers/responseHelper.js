const endResponse = (responseObject, statusCode, data) => responseObject
  .status(statusCode).send([data]);


module.exports = {
  endResponse,
};
