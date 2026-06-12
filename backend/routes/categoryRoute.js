const express = require('express');
const {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  uploadCategoryImage,
  resizeImage,
  setSlug,
} = require('../controllers/categoryController');
const { protect, allowedTo } = require('../controllers/authController');
const subcategoriesRoute = require('./subCategoryRoute');

const router = express.Router();

// Nested: /api/v1/categories/:categoryId/subcategories
router.use('/:categoryId/subcategories', subcategoriesRoute);

router
  .route('/')
  .get(getCategories)
  .post(
    protect,
    allowedTo('admin', 'manager'),
    uploadCategoryImage,
    resizeImage,
    setSlug,
    createCategory
  );

router
  .route('/:id')
  .get(getCategory)
  .put(
    protect,
    allowedTo('admin', 'manager'),
    uploadCategoryImage,
    resizeImage,
    setSlug,
    updateCategory
  )
  .delete(protect, allowedTo('admin', 'manager'), deleteCategory);

module.exports = router;
