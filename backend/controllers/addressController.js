const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/apiError');
const User = require('../models/userModel');

// @desc    Add address
// @route   POST /api/v1/addresses
// @access  Protected/User
exports.addAddress = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.user._id,
    { $addToSet: { addresses: req.body } },
    { new: true }
  );

  res.status(200).json({
    status: 'success',
    message: 'Address added successfully.',
    data: user.addresses,
  });
});

// @desc    Remove address
// @route   DELETE /api/v1/addresses/:addressId
// @access  Protected/User
exports.removeAddress = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.user._id,
    { $pull: { addresses: { _id: req.params.addressId } } },
    { new: true }
  );

  res.status(200).json({
    status: 'success',
    message: 'Address removed successfully.',
    data: user.addresses,
  });
});

// @desc    Update address
// @route   PUT /api/v1/addresses/:addressId
// @access  Protected/User
exports.updateAddress = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  const address = user.addresses.id(req.params.addressId);
  if (!address) {
    return next(new ApiError('No address for this id', 404));
  }
  ['alias', 'details', 'phone', 'city', 'postalCode'].forEach((field) => {
    if (req.body[field] !== undefined) address[field] = req.body[field];
  });
  await user.save();

  res.status(200).json({ status: 'success', data: user.addresses });
});

// @desc    Get logged user addresses
// @route   GET /api/v1/addresses
// @access  Protected/User
exports.getLoggedUserAddresses = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  // Component reads `allAddresses[0].data` -> array of addresses.
  res.status(200).json({
    status: 'success',
    results: user.addresses.length,
    data: user.addresses,
  });
});

// @desc    Get specific address
// @route   GET /api/v1/addresses/:addressId
// @access  Protected/User
exports.getAddress = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  const address = user.addresses.id(req.params.addressId);
  if (!address) {
    return next(new ApiError('No address for this id', 404));
  }
  // OrderPayCashHook reads `oneAddress.data.details/city/postalCode/phone`.
  res.status(200).json({ status: 'success', data: address });
});
