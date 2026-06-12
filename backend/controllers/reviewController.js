const asyncHandler = require('express-async-handler');
const factory = require('./handlersFactory');
const ApiError = require('../utils/apiError');
const Review = require('../models/reviewModel');

// Nested route: GET /products/:productId/reviews
exports.createFilterObj = (req, res, next) => {
  let filterObject = {};
  if (req.params.productId) filterObject = { product: req.params.productId };
  req.filterObj = filterObject;
  next();
};

// Set product (from URL) and user (from token) before create.
exports.setProductIdAndUserIdToBody = (req, res, next) => {
  if (!req.body.product && req.params.productId)
    req.body.product = req.params.productId;
  if (!req.body.user) req.body.user = req.user._id;
  next();
};

// One review per user per product.
exports.preventDuplicateReview = asyncHandler(async (req, res, next) => {
  const existing = await Review.findOne({
    user: req.body.user,
    product: req.body.product,
  });
  if (existing) {
    return next(new ApiError('You already created a review for this product', 400));
  }
  next();
});

// Ensure a user only edits/deletes their own review (admins can delete any).
exports.checkReviewOwnership = (action) =>
  asyncHandler(async (req, res, next) => {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return next(new ApiError(`No review for this id ${req.params.id}`, 404));
    }
    if (action === 'update' && review.user._id.toString() !== req.user._id.toString()) {
      return next(new ApiError('You are not allowed to edit this review', 403));
    }
    if (
      action === 'delete' &&
      review.user._id.toString() !== req.user._id.toString() &&
      req.user.role === 'user'
    ) {
      return next(new ApiError('You are not allowed to delete this review', 403));
    }
    next();
  });

exports.getReviews = factory.getAll(Review);
exports.getReview = factory.getOne(Review);
exports.createReview = factory.createOne(Review);
exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);
