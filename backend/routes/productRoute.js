const express = require('express');
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadProductImages,
  resizeProductImages,
  setSlug,
} = require('../controllers/productController');
const { protect, allowedTo } = require('../controllers/authController');
const reviewsRoute = require('./reviewRoute');

const router = express.Router();

// Nested: /api/v1/products/:productId/reviews
router.use('/:productId/reviews', reviewsRoute);

router
  .route('/')
  .get(getProducts)
  .post(
    protect,
    allowedTo('admin', 'manager'),
    uploadProductImages,
    resizeProductImages,
    setSlug,
    createProduct
  );

router
  .route('/:id')
  .get(getProduct)
  .put(
    protect,
    allowedTo('admin', 'manager'),
    uploadProductImages,
    resizeProductImages,
    setSlug,
    updateProduct
  )
  .delete(protect, allowedTo('admin', 'manager'), deleteProduct);

module.exports = router;
