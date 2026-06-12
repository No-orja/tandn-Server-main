const express = require('express');
const {
  getSubCategories,
  getSubCategory,
  createSubCategory,
  updateSubCategory,
  deleteSubCategory,
  createFilterObj,
  setCategoryIdToBody,
} = require('../controllers/subCategoryController');
const { protect, allowedTo } = require('../controllers/authController');

// mergeParams allows access to :categoryId from the parent category router.
const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(createFilterObj, getSubCategories)
  .post(
    protect,
    allowedTo('admin', 'manager'),
    setCategoryIdToBody,
    createSubCategory
  );

router
  .route('/:id')
  .get(getSubCategory)
  .put(protect, allowedTo('admin', 'manager'), setCategoryIdToBody, updateSubCategory)
  .delete(protect, allowedTo('admin', 'manager'), deleteSubCategory);

module.exports = router;
