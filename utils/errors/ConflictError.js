const { ERROR_CODES, ERROR_MESSAGES } = require('../errorConstants');

class ConflictError extends Error {
  constructor(message = ERROR_MESSAGES.CONFLICT) {
    super(message);
    this.statusCode = ERROR_CODES.CONFLICT;
  }
}

module.exports = ConflictError;
