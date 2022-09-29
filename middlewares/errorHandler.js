const { ERROR_CODES } = require('../utils/errorConstants');

module.exports = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode)
    .send({
      message: statusCode === 500 ? ERROR_CODES.INTERNAL_SERVER_ERROR : message,
    });
  next();
};
