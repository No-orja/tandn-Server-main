const express = require('express');
const {
  getCoupons,
  getCoupon,
  createCoupon,
  updateCoupon,
  deleteCoupon,
} = require('../controllers/couponController');
const { protect, allowedTo } = require('../controllers/authController');

const router = express.Router();

// All coupon routes are admin-only.
router.use(protect, allowedTo('admin', 'manager'));

router.route('/').get(getCoupons).post(createCoupon);
router.route('/:id').get(getCoupon).put(updateCoupon).delete(deleteCoupon);

module.exports = router;
