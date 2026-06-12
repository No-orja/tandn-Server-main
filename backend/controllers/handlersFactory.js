const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/apiError');
const ApiFeatures = require('../utils/apiFeatures');

// Generic CRUD handlers shared by the simple resource controllers
// (categories, subcategories, brands, products, coupons).
// The response wrappers here match exactly what the frontend slices read.

exports.deleteOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await Model.findByIdAndDelete(id);
    if (!document) {
      return next(new ApiError(`No document for this id ${id}`, 404));
    }
    // (findByIdAndDelete fires Review.post('findOneAndDelete') to recompute ratings.)
    // The product & cart slices check `action.payload.status === 200`,
    // so we MUST return 200 (not 204).
    res.status(200).json({ status: 'success', message: 'Deleted successfully' });
  });

exports.updateOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const document = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!document) {
      return next(new ApiError(`No document for this id ${req.params.id}`, 404));
    }
    res.status(200).json({ data: document });
  });

exports.createOne = (Model) =>
  asyncHandler(async (req, res) => {
    const document = await Model.create(req.body);
    res.status(201).json({ data: document });
  });

exports.getOne = (Model, populationOpt) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    let query = Model.findById(id);
    if (populationOpt) query = query.populate(populationOpt);
    const document = await query;
    if (!document) {
      return next(new ApiError(`No document for this id ${id}`, 404));
    }
    res.status(200).json({ data: document });
  });

exports.getAll = (Model, modelName = '') =>
  asyncHandler(async (req, res) => {
    let filter = {};
    if (req.filterObj) filter = req.filterObj;

    const documentsCounts = await Model.countDocuments(filter);
    const apiFeatures = new ApiFeatures(Model.find(filter), req.query)
      .filter()
      .search(modelName)
      .limitFields()
      .sort();

    // Re-count after filter/search to keep numberOfPages accurate.
    apiFeatures.paginate(documentsCounts);

    const { mongooseQuery, paginationResult } = apiFeatures;
    const documents = await mongooseQuery;

    res.status(200).json({
      results: documents.length,
      paginationResult,
      data: documents,
    });
  });
