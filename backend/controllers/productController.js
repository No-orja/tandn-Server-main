const { v4: uuidv4 } = require('uuid');
const sharp = require('sharp');
const asyncHandler = require('express-async-handler');
const slugify = require('slugify');

const factory = require('./handlersFactory');
const { uploadMixOfImages } = require('../middlewares/uploadImageMiddleware');
const { uploadBuffer } = require('../config/cloudinary');
const Product = require('../models/productModel');

// imageCover (single) + images (up to 8) — matches AddProductHook field names.
exports.uploadProductImages = uploadMixOfImages([
  { name: 'imageCover', maxCount: 1 },
  { name: 'images', maxCount: 8 },
]);

exports.resizeProductImages = asyncHandler(async (req, res, next) => {
  // 1) imageCover
  if (req.files && req.files.imageCover) {
    const imageCoverFileName = `product-${uuidv4()}-${Date.now()}-cover`;
    const buffer = await sharp(req.files.imageCover[0].buffer)
      .resize(2000, 1333)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toBuffer();
    req.body.imageCover = await uploadBuffer(buffer, 'products', imageCoverFileName);
  }

  // 2) images
  if (req.files && req.files.images) {
    req.body.images = [];
    await Promise.all(
      req.files.images.map(async (img, index) => {
        const imageName = `product-${uuidv4()}-${Date.now()}-${index + 1}`;
        const buffer = await sharp(img.buffer)
          .resize(2000, 1333)
          .toFormat('jpeg')
          .jpeg({ quality: 90 })
          .toBuffer();
        req.body.images.push(await uploadBuffer(buffer, 'products', imageName));
      })
    );
  }
  next();
});

exports.setSlug = (req, res, next) => {
  if (req.body.title) req.body.slug = slugify(req.body.title);
  next();
};

// GET /api/v1/products — supports ?limit ?page ?category ?brand ?keyword ?sort ?fields
exports.getProducts = factory.getAll(Product, 'Product');
exports.getProduct = factory.getOne(Product); // NOT populated: category/brand stay as IDs
exports.createProduct = factory.createOne(Product);
exports.updateProduct = factory.updateOne(Product);
exports.deleteProduct = factory.deleteOne(Product);
