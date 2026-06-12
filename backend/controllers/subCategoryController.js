const slugify = require('slugify');
const factory = require('./handlersFactory');
const SubCategory = require('../models/subCategoryModel');

// For nested route: GET /categories/:categoryId/subcategories
exports.createFilterObj = (req, res, next) => {
  let filterObject = {};
  if (req.params.categoryId) filterObject = { category: req.params.categoryId };
  req.filterObj = filterObject;
  next();
};

// Allow nested create + slug
exports.setCategoryIdToBody = (req, res, next) => {
  if (!req.body.category && req.params.categoryId) {
    req.body.category = req.params.categoryId;
  }
  if (req.body.name) req.body.slug = slugify(req.body.name);
  next();
};

exports.getSubCategories = factory.getAll(SubCategory);
exports.getSubCategory = factory.getOne(SubCategory);
exports.createSubCategory = factory.createOne(SubCategory);
exports.updateSubCategory = factory.updateOne(SubCategory);
exports.deleteSubCategory = factory.deleteOne(SubCategory);
