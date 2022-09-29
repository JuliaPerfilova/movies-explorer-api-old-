const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../utils/errors/NotFoundError');
const BadRequestError = require('../utils/errors/BadRequestError');
const UnauthorizedError = require('../utils/errors/UnauthorizedError');
const ConflictError = require('../utils/errors/ConflictError');
const { ERROR_MESSAGES } = require('../utils/errorConstants');

const { NODE_ENV, JWT_SECRET } = process.env;


module.exports.getCurrentUser = (req, res, next) => User.findById(req.user._id)
  .orFail(() => {
    next(new NotFoundError());
  })
  .then((user) => res.send({ data: user }))
  .catch((err) => {
    next(err);
  });

module.exports.updateProfile = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .orFail(() => {
      next(new NotFoundError());
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') next(new BadRequestError());
      else next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );

      res.send({ token, message: 'Успешная авторизация' });
    })
    .catch(() => {
      next(new UnauthorizedError(ERROR_MESSAGES.WRONG_USER_DATA));
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
  } = req.body;

  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => {
      res.send({ data: (({ password, ...other }) => other)(user.toJSON()) });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(ERROR_MESSAGES.WRONG_INPUT_DATA));
      }
      if (err.code === 11000) {
        next(new ConflictError(ERROR_MESSAGES.CONFLICT));
      } else {
        next(err);
      }
    });
};

