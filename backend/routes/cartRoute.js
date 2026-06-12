const express = require('express');
const {
  addProductToCart,
  getLoggedUserCart,
  updateCartItemQuantity,
  applyCoupon,
  removeSpecificCartItem,
  clearCart,
} = require('../controllers/cartController');
const { protect, allowedTo } = require('../controllers/authController');

const router = express.Router();

router.use(protect, allowedTo('user'));

router.put('/applyCoupon', applyCoupon);

router
  .route('/')
  .post(addProductToCart)
  .get(getLoggedUserCart)
  .delete(clearCart);

router
  .route('/:itemId')
  .put(updateCartItemQuantity)
  .delete(removeSpecificCartItem);

module.exports = router;
