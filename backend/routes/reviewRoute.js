const express = require('express');
const {
  getReviews,
  getReview,
  createReview,
  updateReview,
  deleteReview,
  createFilterObj,
  setProductIdAndUserIdToBody,
  preventDuplicateReview,
  checkReviewOwnership,
} = require('../controllers/reviewController');
const { protect, allowedTo } = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(createFilterObj, getReviews)
  .post(
    protect,
    allowedTo('user'),
    setProductIdAndUserIdToBody,
    preventDuplicateReview,
    createReview
  );

router
  .route('/:id')
  .get(getReview)
  .put(protect, allowedTo('user'), checkReviewOwnership('update'), updateReview)
  .delete(
    protect,
    allowedTo('user', 'admin', 'manager'),
    checkReviewOwnership('delete'),
    deleteReview
  );

module.exports = router;
