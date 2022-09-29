const { ERROR_CODES, ERROR_MESSAGES } = require('../errorConstants');

class NotFoundError extends Error {
  constructor(message = ERROR_MESSAGES.NOT_FOUND) {
    super(message);
    this.statusCode = ERROR_CODES.NOT_FOUND;
  }
}

module.exports = NotFoundError;
