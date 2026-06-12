const { check } = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');
const User = require('../../models/userModel');

exports.signupValidator = [
  check('name')
    .notEmpty()
    .withMessage('User name required')
    .isLength({ min: 2 })
    .withMessage('Too short user name'),
  check('email')
    .notEmpty()
    .withMessage('Email required')
    .isEmail()
    .withMessage('Invalid email address')
    .custom(async (val) => {
      const user = await User.findOne({ email: val });
      if (user) throw new Error('Email already in use');
      return true;
    }),
  check('password')
    .notEmpty()
    .withMessage('Password required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
  check('phone')
    .optional()
    .isMobilePhone(['ar-EG', 'ar-SA', 'en-US', 'any'])
    .withMessage('Invalid phone number'),
  validatorMiddleware,
];

exports.loginValidator = [
  check('email')
    .notEmpty()
    .withMessage('Email required')
    .isEmail()
    .withMessage('Invalid email address'),
  check('password').notEmpty().withMessage('Password required'),
  validatorMiddleware,
];
