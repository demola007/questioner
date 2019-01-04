const endResponse = (responseObject, statusCode, data) => responseObject
  .status(statusCode).send({ status: statusCode, data: [data] });


module.exports = {
  endResponse,
};
