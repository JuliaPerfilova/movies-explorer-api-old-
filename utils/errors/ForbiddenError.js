const { ERROR_CODES, ERROR_MESSAGES } = require('../errorConstants');

class ForbiddenError extends Error {
  constructor(message = ERROR_MESSAGES.FORBIDDEN) {
    super(message);
    this.statusCode = ERROR_CODES.FORBIDDEN;
  }
}

module.exports = ForbiddenError;
