const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');

const ApiError = require('../utils/apiError');
const createToken = require('../utils/createToken');
const factory = require('./handlersFactory');
const User = require('../models/userModel');
const { sanitizeUser } = require('./authController');

// @desc    Get logged user data
// @route   GET /api/v1/users/getMe
// @access  Protected
exports.getLoggedUserData = asyncHandler(async (req, res, next) => {
  req.params.id = req.user._id;
  next();
});

// @desc    Update logged user data (name, email, phone)
// @route   PUT /api/v1/users/updateMe
// @access  Protected
exports.updateLoggedUserData = asyncHandler(async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
    },
    { new: true }
  );

  // UpdateUserDataHook stores `response.data.data.user`.
  res.status(200).json({ data: { user: sanitizeUser(updatedUser) } });
});

// @desc    Update logged user password
// @route   PUT /api/v1/users/changeMyPassword
// @access  Protected
exports.updateLoggedUserPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (
    req.body.currentPassword &&
    !(await bcrypt.compare(req.body.currentPassword, user.password))
  ) {
    return next(new ApiError('Incorrect current password', 401));
  }

  user.password = req.body.password;
  user.passwordChangedAt = Date.now();
  await user.save();

  const token = createToken(user._id);
  res.status(200).json({ token, data: sanitizeUser(user) });
});

// ---- Admin user management (not used by the frontend, provided for completeness) ----
exports.getUsers = factory.getAll(User);
exports.getUser = factory.getOne(User);
exports.createUser = factory.createOne(User);
exports.deleteUser = factory.deleteOne(User);
exports.updateUser = asyncHandler(async (req, res, next) => {
  const document = await User.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      role: req.body.role,
      active: req.body.active,
    },
    { new: true }
  );
  if (!document) return next(new ApiError(`No user for this id`, 404));
  res.status(200).json({ data: document });
});
