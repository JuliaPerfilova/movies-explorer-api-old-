const { ERROR_CODES, ERROR_MESSAGES } = require('../errorConstants');

class InternalServerError extends Error {
  constructor(message = ERROR_MESSAGES.INTERNAL_SERVER_ERROR) {
    super(message);
    this.statusCode = ERROR_CODES.INTERNAL_SERVER_ERROR;
  }
}

module.exports = InternalServerError;
