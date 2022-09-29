const express = require('express');

const router = express.Router();
const {celebrate, Joi} = require('celebrate');
const userRouter = require('./users');
//const cardRouter = require('./cards');
const {login, createUser} = require('../controllers/users');
const {mailValidation} = require('../middlewares/validators');
const auth = require('../middlewares/auth');
const NotFoundError = require('../utils/errors/NotFoundError');

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().custom(mailValidation),
    password: Joi.string().required(),
  }),
}), createUser);

router.use(auth);

router.use('/users', userRouter);
//router.use('/cards', cardRouter);

router.use('/*', (req, res, next) => {
  next(new NotFoundError('Несуществующий адрес страницы'));
});

module.exports = router;
