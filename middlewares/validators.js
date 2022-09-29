const validator = require('validator');
const { CelebrateError } = require('celebrate');
const { ERROR_MESSAGES } = require('../utils/errorConstants');

module.exports.urlValidation = (value) => {
  if (!validator.isURL(value)) {
    throw new CelebrateError(ERROR_MESSAGES.WRONG_URL);
  }
  return value;
};

module.exports.mailValidation = (value) => {
  if (!validator.isEmail(value)) {
    throw new CelebrateError(ERROR_MESSAGES.WRONG_EMAIL);
  }
  return value;
};
