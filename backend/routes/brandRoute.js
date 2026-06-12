const express = require('express');
const {
  getBrands,
  getBrand,
  createBrand,
  updateBrand,
  deleteBrand,
  uploadBrandImage,
  resizeImage,
  setSlug,
} = require('../controllers/brandController');
const { protect, allowedTo } = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(getBrands)
  .post(
    protect,
    allowedTo('admin', 'manager'),
    uploadBrandImage,
    resizeImage,
    setSlug,
    createBrand
  );

router
  .route('/:id')
  .get(getBrand)
  .put(
    protect,
    allowedTo('admin', 'manager'),
    uploadBrandImage,
    resizeImage,
    setSlug,
    updateBrand
  )
  .delete(protect, allowedTo('admin', 'manager'), deleteBrand);

module.exports = router;
