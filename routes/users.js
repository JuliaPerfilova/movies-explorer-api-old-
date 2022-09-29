const express = require('express');
const { celebrate, Joi } = require('celebrate');

const router = express.Router();
const {
  updateProfile, getCurrentUser,
} = require('../controllers/users');

router.get('/me', getCurrentUser);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
}), updateProfile);


module.exports = router;
