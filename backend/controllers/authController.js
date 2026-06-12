const crypto = require('crypto');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const ApiError = require('../utils/apiError');
const createToken = require('../utils/createToken');
const User = require('../models/userModel');

// Shape the user object exactly as the frontend stores it (flat: name/email/role
// read directly by NavBarLogin and the profile hooks).
const sanitizeUser = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  phone: user.phone,
  role: user.role,
  active: user.active,
  profileImg: user.profileImg,
});

// @desc    Signup
// @route   POST /api/v1/auth/signup
// @access  Public
exports.signup = asyncHandler(async (req, res) => {
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.password,
  });

  const token = createToken(user._id);
  res.status(201).json({ data: sanitizeUser(user), token });
});

// @desc    Login
// @route   POST /api/v1/auth/login
// @access  Public
exports.login = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    // LoginHook checks for this exact message.
    return next(new ApiError('Incorrect email or password', 401));
  }
  const token = createToken(user._id);
  res.status(200).json({ data: sanitizeUser(user), token });
});

// @desc    Protect routes (must be logged in)
exports.protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return next(
      new ApiError('You are not logged in. Please login to get access.', 401)
    );
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const currentUser = await User.findById(decoded.userId);
  if (!currentUser) {
    return next(new ApiError('The user belonging to this token no longer exists.', 401));
  }

  if (currentUser.passwordChangedAt) {
    const changedTimestamp = parseInt(
      currentUser.passwordChangedAt.getTime() / 1000,
      10
    );
    if (changedTimestamp > decoded.iat) {
      return next(
        new ApiError('User recently changed password. Please login again.', 401)
      );
    }
  }

  req.user = currentUser;
  next();
});

// @desc    Authorization (role-based)
exports.allowedTo = (...roles) =>
  asyncHandler(async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new ApiError('You are not allowed to access this route', 403));
    }
    next();
  });

// @desc    Forgot password
// @route   POST /api/v1/auth/forgotPasswords
// @access  Public
exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ApiError(`There is no user with that email ${req.body.email}`, 404));
  }

  const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
  const hashedResetCode = crypto
    .createHash('sha256')
    .update(resetCode)
    .digest('hex');

  user.passwordResetCode = hashedResetCode;
  user.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 min
  user.passwordResetVerified = false;
  await user.save();

  // No SMTP configured in this dev replacement — print the code to the console.
  console.log(`🔑 Password reset code for ${user.email}: ${resetCode}`);

  res.status(200).json({ status: 'Success', message: 'Reset code sent to email' });
});

// @desc    Verify password reset code
// @route   POST /api/v1/auth/verifyResetCode
// @access  Public
exports.verifyPassResetCode = asyncHandler(async (req, res, next) => {
  const hashedResetCode = crypto
    .createHash('sha256')
    .update(req.body.resetCode)
    .digest('hex');

  const user = await User.findOne({
    passwordResetCode: hashedResetCode,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) {
    return next(new ApiError('Reset code invalid or expired', 400));
  }

  user.passwordResetVerified = true;
  await user.save();

  res.status(200).json({ status: 'Success' });
});

// @desc    Reset password
// @route   PUT /api/v1/auth/resetPassword
// @access  Public
exports.resetPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ApiError(`There is no user with email ${req.body.email}`, 404));
  }
  if (!user.passwordResetVerified) {
    return next(new ApiError('Reset code not verified', 400));
  }

  user.password = req.body.newPassword;
  user.passwordResetCode = undefined;
  user.passwordResetExpires = undefined;
  user.passwordResetVerified = undefined;
  user.passwordChangedAt = Date.now();
  await user.save();

  const token = createToken(user._id);
  res.status(200).json({ token, data: sanitizeUser(user) });
});

exports.sanitizeUser = sanitizeUser;
