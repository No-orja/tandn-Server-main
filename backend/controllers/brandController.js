const { v4: uuidv4 } = require('uuid');
const sharp = require('sharp');
const asyncHandler = require('express-async-handler');
const slugify = require('slugify');

const factory = require('./handlersFactory');
const { uploadSingleImage } = require('../middlewares/uploadImageMiddleware');
const { uploadBuffer } = require('../config/cloudinary');
const Brand = require('../models/brandModel');

exports.uploadBrandImage = uploadSingleImage('image');

exports.resizeImage = asyncHandler(async (req, res, next) => {
  if (req.file) {
    const filename = `brand-${uuidv4()}-${Date.now()}`;
    const buffer = await sharp(req.file.buffer)
      .resize(600, 600)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toBuffer();
    req.body.image = await uploadBuffer(buffer, 'brands', filename);
  }
  next();
});

exports.setSlug = (req, res, next) => {
  if (req.body.name) req.body.slug = slugify(req.body.name);
  next();
};

exports.getBrands = factory.getAll(Brand);
exports.getBrand = factory.getOne(Brand);
exports.createBrand = factory.createOne(Brand);
exports.updateBrand = factory.updateOne(Brand);
exports.deleteBrand = factory.deleteOne(Brand);
