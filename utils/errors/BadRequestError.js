const { ERROR_CODES, ERROR_MESSAGES } = require('../errorConstants');

class BadRequestError extends Error {
  constructor(message = ERROR_MESSAGES.BAD_REQUEST) {
    super(message);
    this.statusCode = ERROR_CODES.BAD_REQUEST;
  }
}

module.exports = BadRequestError;
