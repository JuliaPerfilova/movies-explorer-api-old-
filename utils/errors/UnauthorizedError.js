const { ERROR_CODES, ERROR_MESSAGES } = require('../errorConstants');

class UnauthorizedError extends Error {
  constructor(message = ERROR_MESSAGES.UNAUTHORIZED) {
    super(message);
    this.statusCode = ERROR_CODES.UNAUTHORIZED;
  }
}

module.exports = UnauthorizedError;
